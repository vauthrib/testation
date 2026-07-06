import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Parser CSV simple (séparateur ;)
function parseCsv(text: string): { headers: string[], rows: Record<string, string>[] } {
  // Enlever le BOM si présent
  const content = text.replace(/^\uFEFF/, '')
  const lines = content.split(/\r?\n/).filter(l => l.trim())
  if (lines.length === 0) return { headers: [], rows: [] }
  
  const parseLine = (line: string): string[] => {
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

  const headers = parseLine(lines[0])
  const rows = lines.slice(1).map(line => {
    const values = parseLine(line)
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    return obj
  })

  return { headers, rows }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const receptionsFile = formData.get('receptions') as File | null
    const bobinesFile = formData.get('bobines') as File | null
    const mouvementsFile = formData.get('mouvements') as File | null
    const itemsFile = formData.get('items') as File | null

    // Effacer la base existante
    await prisma.mouvement.deleteMany()
    await prisma.bobine.deleteMany()
    await prisma.reception.deleteMany()
    await prisma.itemPersonnalise.deleteMany()

    // Importer les items
    if (itemsFile && itemsFile.size > 0) {
      const text = await itemsFile.text()
      const { rows } = parseCsv(text)
      for (const row of rows) {
        try {
          await prisma.itemPersonnalise.create({
            data: {
              categorie: row.categorie as any,
              nom: row.nom,
              ordre: parseInt(row.ordre) || 0
            }
          })
        } catch (e) { /* ignorer doublons */ }
      }
    }

    // Maps pour les anciens → nouveaux IDs
    const receptionIdMap = new Map<number, number>()
    const bobineIdMap = new Map<number, number>()

    // Importer les réceptions
    if (receptionsFile && receptionsFile.size > 0) {
      const text = await receptionsFile.text()
      const { rows } = parseCsv(text)
      for (const row of rows) {
        const oldId = parseInt(row.id)
        const newReception = await prisma.reception.create({
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
            date_reception: new Date(row.date_reception)
          }
        })
        receptionIdMap.set(oldId, newReception.id)
      }
    }

    // Importer les bobines
    if (bobinesFile && bobinesFile.size > 0) {
      const text = await bobinesFile.text()
      const { rows } = parseCsv(text)
      for (const row of rows) {
        const oldId = parseInt(row.id)
        const oldReceptionId = parseInt(row.reception_id)
        const newReceptionId = receptionIdMap.get(oldReceptionId)
        if (!newReceptionId) continue
        
        const newBobine = await prisma.bobine.create({
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
    }

    // Importer les mouvements
    if (mouvementsFile && mouvementsFile.size > 0) {
      const text = await mouvementsFile.text()
      const { rows } = parseCsv(text)
      for (const row of rows) {
        const oldBobineId = parseInt(row.bobine_id)
        const newBobineId = bobineIdMap.get(oldBobineId)
        if (!newBobineId) continue

        await prisma.mouvement.create({
          data: {
            bobine_id: newBobineId,
            type_mouvement: row.type_mouvement as any,
            poids_mouvement: parseFloat(row.poids_mouvement),
            n_commande_client: row.n_commande_client || null,
            client: row.client || null,
            texte_libre: row.texte_libre || null,
            lieu_destination: row.lieu_destination ? (row.lieu_destination as any) : null,
            date_mouvement: new Date(row.date_mouvement)
          }
        })
      }
    }

    return NextResponse.json({ message: 'Base restaurée avec succès depuis les CSV' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur: ' + (error as Error).message }, { status: 500 })
  }
}