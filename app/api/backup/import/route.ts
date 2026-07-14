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

function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === '') return null
  
  // Nettoyer la chaîne
  const clean = dateStr.trim()
  
  // Essayer plusieurs formats
  const formats = [
    clean,
    clean.replace(' ', 'T'),
    clean.split(' ')[0] + 'T00:00:00.000Z',
    clean.split('T')[0] + 'T00:00:00.000Z'
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

    // Lire le contenu
    const content = await allFile.text()
    const cleanContent = content.replace(/^\uFEFF/, '') // Enlever le BOM
    
    // Séparer par sections
    const sections: Record<string, string[]> = {}
    let currentSection = ''
    const lines = cleanContent.split(/\r?\n/)
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Détecter le début d'une section
      const sectionMatch = trimmed.match(/^###SECTION:(\w+)###$/)
      if (sectionMatch) {
        currentSection = sectionMatch[1]
        sections[currentSection] = []
        continue
      }
      
      // Ajouter la ligne à la section courante
      if (currentSection && trimmed) {
        sections[currentSection].push(trimmed)
      }
    }

    // Parser chaque section
    const parseSectionData = (sectionName: string) => {
      const sectionLines = sections[sectionName] || []
      if (sectionLines.length === 0) return []
      
      const headers = parseCsvLine(sectionLines[0])
      const rows = sectionLines.slice(1).map(line => {
        const values = parseCsvLine(line)
        const obj: Record<string, string> = {}
        headers.forEach((h, idx) => {
          obj[h] = values[idx] || ''
        })
        return obj
      })
      
      return rows
    }

    const receptionsData = parseSectionData('RECEPTIONS')
    const bobinesData = parseSectionData('BOBINES')
    const mouvementsData = parseSectionData('MOUVEMENTS')
    const itemsData = parseSectionData('ITEMS')

    console.log('Sections trouvées:', Object.keys(sections))
    console.log('Réceptions:', receptionsData.length, 'lignes')
    console.log('Bobines:', bobinesData.length, 'lignes')
    console.log('Mouvements:', mouvementsData.length, 'lignes')
    console.log('Items:', itemsData.length, 'lignes')

    // VALIDATION : Vérifier toutes les dates AVANT de supprimer
    for (let i = 0; i < receptionsData.length; i++) {
      const row = receptionsData[i]
      const date = parseDate(row.date_reception)
      if (!date) {
        return NextResponse.json({ 
          error: `Date invalide pour la réception ligne ${i + 1}: "${row.date_reception}". Valeurs: id=${row.id}, code=${row.code_fournisseur}` 
        }, { status: 400 })
      }
    }

    for (let i = 0; i < mouvementsData.length; i++) {
      const row = mouvementsData[i]
      const date = parseDate(row.date_mouvement)
      if (!date) {
        return NextResponse.json({ 
          error: `Date invalide pour le mouvement ligne ${i + 1}: "${row.date_mouvement}". Valeurs: id=${row.id}, bobine_id=${row.bobine_id}` 
        }, { status: 400 })
      }
    }

    // Tout est valide, procéder avec une transaction
    await prisma.$transaction(async (tx) => {
      // Effacer dans l'ordre
      await tx.mouvement.deleteMany()
      await tx.bobine.deleteMany()
      await tx.reception.deleteMany()
      await tx.itemPersonnalise.deleteMany()

      const receptionIdMap = new Map<number, number>()
      const bobineIdMap = new Map<number, number>()

      // Importer les items
      for (const row of itemsData) {
        try {
          await tx.itemPersonnalise.create({
            data: {
              categorie: row.categorie as any,
              nom: row.nom,
              ordre: parseInt(row.ordre) || 0
            }
          })
        } catch (e) {
          console.log('Item ignoré:', row)
        }
      }

      // Importer les réceptions
      for (const row of receptionsData) {
        const oldId = parseInt(row.id)
        const date = parseDate(row.date_reception)
        if (!date || isNaN(oldId)) {
          console.log('Réception ignorée:', row)
          continue
        }
        
        const newReception = await tx.reception.create({
          data: {
            code_fournisseur: row.code_fournisseur || '',
            num_commande: row.num_commande || '',
            num_type_produit: row.num_type_produit || '',
            type_materiel: (row.type_materiel || 'Fil') as any,
            diametre_fil: row.diametre_fil ? parseFloat(row.diametre_fil) : null,
            longueur_feuillard: row.longueur_feuillard ? parseFloat(row.longueur_feuillard) : null,
            largeur_feuillard: row.largeur_feuillard ? parseFloat(row.largeur_feuillard) : null,
            matiere: row.matiere || '',
            durete: row.durete || '',
            revetement: row.revetement || '',
            date_reception: date
          }
        })
        receptionIdMap.set(oldId, newReception.id)
      }

      // Importer les bobines
      for (const row of bobinesData) {
        const oldId = parseInt(row.id)
        const oldReceptionId = parseInt(row.reception_id)
        const newReceptionId = receptionIdMap.get(oldReceptionId)
        
        if (!newReceptionId || isNaN(oldId)) {
          console.log('Bobine ignorée:', row)
          continue
        }
        
        const newBobine = await tx.bobine.create({
          data: {
            reception_id: newReceptionId,
            code_bobine: row.code_bobine || '',
            num_bobine: parseInt(row.num_bobine) || 1,
            poids_initial: parseFloat(row.poids_initial) || 0,
            poids_actuel: parseFloat(row.poids_actuel) || 0,
            statut: (row.statut || 'EN_STOCK') as any,
            lieu: (row.lieu || 'STOCK_PRINCIPAL') as any,
            num_commande_fabrication: row.num_commande_fabrication || null
          }
        })
        bobineIdMap.set(oldId, newBobine.id)
      }

      // Importer les mouvements
      for (const row of mouvementsData) {
        const oldBobineId = parseInt(row.bobine_id)
        const newBobineId = bobineIdMap.get(oldBobineId)
        const date = parseDate(row.date_mouvement)
        
        if (!newBobineId || !date) {
          console.log('Mouvement ignoré:', row)
          continue
        }

        await tx.mouvement.create({
          data: {
            bobine_id: newBobineId,
            type_mouvement: (row.type_mouvement || 'ENTREE_FOURNISSEUR') as any,
            poids_mouvement: parseFloat(row.poids_mouvement) || 0,
            n_commande_client: row.n_commande_client || null,
            client: row.client || null,
            texte_libre: row.texte_libre || null,
            lieu_destination: row.lieu_destination ? (row.lieu_destination as any) : null,
            date_mouvement: date
          }
        })
      }
    })

    return NextResponse.json({ 
      message: 'Base restaurée avec succès',
      stats: {
        receptions: receptionsData.length,
        bobines: bobinesData.length,
        mouvements: mouvementsData.length,
        items: itemsData.length
      }
    })
  } catch (error) {
    console.error('Erreur import:', error)
    return NextResponse.json({ error: 'Erreur serveur: ' + (error as Error).message }, { status: 500 })
  }
}