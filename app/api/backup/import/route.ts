import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ';' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function parseSection(text: string): { headers: string[], rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim() && !l.startsWith('###SECTION'))
  if (lines.length === 0) return { headers: [], rows: [] }
  
  const headers = parseCsvLine(lines[0])
  const rows = lines.slice(1).map(line => {
    const values = parseCsvLine(line)
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    return obj
  })

  return { headers, rows }
}

function splitSections(content: string): Record<string, string> {
  const result: Record<string, string> = {}
  const sectionRegex = /###SECTION:(\w+)###/g
  let match
  const sections: { name: string, index: number }[] = []
  
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({ name: match[1], index: match.index + match[0].length })
  }
  
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].index
    const end = i + 1 < sections.length 
      ? content.lastIndexOf('###SECTION:', sections[i + 1].index)
      : content.length
    result[sections[i].name] = content.substring(start, end).trim()
  }
  
  return result
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  
  // Essayer plusieurs formats
  const formats = [
    dateStr, // ISO format
    dateStr.replace(' ', 'T'), // Espace vers T
    dateStr.split(' ')[0] + 'T00:00:00.000Z', // Juste la date
  ]
  
  for (const fmt of formats) {
    const date = new Date(fmt)
    if (!isNaN(date.getTime())) {
      return date
    }
  }
  
  return null
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const allFile = formData.get('all') as File | null

    if (!allFile || allFile.size === 0) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Parser le contenu
    const content = (await allFile.text()).replace(/^\uFEFF/, '')
    const sections = splitSections(content)
    
    const receptionsText = sections.RECEPTIONS || ''
    const bobinesText = sections.BOBINES || ''
    const mouvementsText = sections.MOUVEMENTS || ''
    const itemsText = sections.ITEMS || ''

    // VALIDATION AVANT suppression
    const receptionsData = receptionsText ? parseSection(receptionsText) : { headers: [], rows: [] }
    const bobinesData = bobinesText ? parseSection(bobinesText) : { headers: [], rows: [] }
    const mouvementsData = mouvementsText ? parseSection(mouvementsText) : { headers: [], rows: [] }
    const itemsData = itemsText ? parseSection(itemsText) : { headers: [], rows: [] }

    // Valider les dates des réceptions
    for (const row of receptionsData.rows) {
      const date = parseDate(row.date_reception)
      if (!date) {
        return NextResponse.json({ 
          error: `Date invalide pour la réception ID ${row.id}: "${row.date_reception}". Format attendu: YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS` 
        }, { status: 400 })
      }
    }

    // Valider les dates des mouvements
    for (const row of mouvementsData.rows) {
      const date = parseDate(row.date_mouvement)
      if (!date) {
        return NextResponse.json({ 
          error: `Date invalide pour le mouvement ID ${row.id}: "${row.date_mouvement}". Format attendu: YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS` 
        }, { status: 400 })
      }
    }

    // Tout est valide, on peut procéder avec une transaction
    await prisma.$transaction(async (tx) => {
      // Effacer dans l'ordre
      await tx.mouvement.deleteMany()
      await tx.bobine.deleteMany()
      await tx.reception.deleteMany()
      await tx.itemPersonnalise.deleteMany()

      const receptionIdMap = new Map<number, number>()
      const bobineIdMap = new Map<number, number>()

      // Importer les items
      for (const row of itemsData.rows) {
        try {
          await tx.itemPersonnalise.create({
            data: {
              categorie: row.categorie as any,
              nom: row.nom,
              ordre: parseInt(row.ordre) || 0
            }
          })
        } catch (e) { /* ignorer doublons */ }
      }

      // Importer les réceptions
      for (const row of receptionsData.rows) {
        const oldId = parseInt(row.id)
        const date = parseDate(row.date_reception)
        if (!date) continue
        
        const newReception = await tx.reception.create({
          data: {
            code_fournisseur: row.code_fournisseur,
            num_commande: row.num_commande,
            num_type_produit: row.num_type_produit,
            type_materiel: row.type_materiel as any,
            diametre_fil: row.diametre_fil ? parseFloat(row.diametre_fil) : null,
            longueur_feuillard: row.longueur_feuillard ? parseFloat(row.longueur_feuillard) : null,
            largeur_feuillard: row.largeur_feuillard ? parseFloat(row.largeur_feuillard) : null,
            matiere: row.matiere,
            durete: row.durete,
            revetement: row.revetement,
            date_reception: date
          }
        })
        receptionIdMap.set(oldId, newReception.id)
      }

      // Importer les bobines
      for (const row of bobinesData.rows) {
        const oldId = parseInt(row.id)
        const oldReceptionId = parseInt(row.reception_id)
        const newReceptionId = receptionIdMap.get(oldReceptionId)
        if (!newReceptionId) continue
        
        const newBobine = await tx.bobine.create({
          data: {
            reception_id: newReceptionId,
            code_bobine: row.code_bobine,
            num_bobine: parseInt(row.num_bobine),
            poids_initial: parseFloat(row.poids_initial),
            poids_actuel: parseFloat(row.poids_actuel),
            statut: row.statut as any,
            lieu: row.lieu as any,
            num_commande_fabrication: row.num_commande_fabrication || null
          }
        })
        bobineIdMap.set(oldId, newBobine.id)
      }

      // Importer les mouvements
      for (const row of mouvementsData.rows) {
        const oldBobineId = parseInt(row.bobine_id)
        const newBobineId = bobineIdMap.get(oldBobineId)
        if (!newBobineId) continue

        const date = parseDate(row.date_mouvement)
        if (!date) continue

        await tx.mouvement.create({
          data: {
            bobine_id: newBobineId,
            type_mouvement: row.type_mouvement as any,
            poids_mouvement: parseFloat(row.poids_mouvement),
            n_commande_client: row.n_commande_client || null,
            client: row.client || null,
            texte_libre: row.texte_libre || null,
            lieu_destination: row.lieu_destination ? (row.lieu_destination as any) : null,
            date_mouvement: date
          }
        })
      }
    })

    return NextResponse.json({ message: 'Base restaurée avec succès' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur: ' + (error as Error).message }, { status: 500 })
  }
}