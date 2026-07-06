import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import archiver from 'archiver'

function csvEscape(value: any): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(';') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toCsv(headers: string[], rows: any[][]): string {
  const BOM = '\uFEFF'
  const lines = [headers.join(';'), ...rows.map(r => r.map(csvEscape).join(';'))]
  return BOM + lines.join('\n')
}

export async function GET() {
  try {
    // Récupérer toutes les données
    const [receptions, bobines, mouvements, items] = await Promise.all([
      prisma.reception.findMany({ orderBy: { id: 'asc' } }),
      prisma.bobine.findMany({ orderBy: { id: 'asc' } }),
      prisma.mouvement.findMany({ orderBy: { id: 'asc' } }),
      prisma.itemPersonnalise.findMany({ orderBy: { id: 'asc' } })
    ])

    // CSV Réceptions
    const receptionsHeaders = ['id', 'code_fournisseur', 'num_commande', 'num_type_produit', 'type_materiel',
      'diametre_fil', 'longueur_feuillard', 'largeur_feuillard', 'matiere', 'durete', 'revetement', 'date_reception']
    const receptionsRows = receptions.map(r => [
      r.id, r.code_fournisseur, r.num_commande, r.num_type_produit, r.type_materiel,
      r.diametre_fil?.toString() || '', r.longueur_feuillard?.toString() || '', r.largeur_feuillard?.toString() || '',
      r.matiere, r.durete, r.revetement, r.date_reception.toISOString()
    ])
    const receptionsCsv = toCsv(receptionsHeaders, receptionsRows)

    // CSV Bobines
    const bobinesHeaders = ['id', 'reception_id', 'code_bobine', 'num_bobine', 'poids_initial', 'poids_actuel',
      'statut', 'lieu', 'num_commande_fabrication']
    const bobinesRows = bobines.map(b => [
      b.id, b.reception_id, b.code_bobine, b.num_bobine,
      b.poids_initial.toString(), b.poids_actuel.toString(),
      b.statut, b.lieu, b.num_commande_fabrication || ''
    ])
    const bobinesCsv = toCsv(bobinesHeaders, bobinesRows)

    // CSV Mouvements
    const mouvementsHeaders = ['id', 'bobine_id', 'type_mouvement', 'poids_mouvement', 'n_commande_client',
      'client', 'texte_libre', 'lieu_destination', 'date_mouvement']
    const mouvementsRows = mouvements.map(m => [
      m.id, m.bobine_id, m.type_mouvement, m.poids_mouvement.toString(),
      m.n_commande_client || '', m.client || '', m.texte_libre || '',
      m.lieu_destination || '', m.date_mouvement.toISOString()
    ])
    const mouvementsCsv = toCsv(mouvementsHeaders, mouvementsRows)

    // CSV Items
    const itemsHeaders = ['id', 'categorie', 'nom', 'ordre']
    const itemsRows = items.map(i => [i.id, i.categorie, i.nom, i.ordre])
    const itemsCsv = toCsv(itemsHeaders, itemsRows)

    // Créer le ZIP
    const archive = archiver('zip', { zlib: { level: 9 } })
    const chunks: Buffer[] = []

    archive.on('data', (chunk) => chunks.push(chunk))

    const date = new Date().toISOString().split('T')[0]
    archive.append(receptionsCsv, { name: 'receptions.csv' })
    archive.append(bobinesCsv, { name: 'bobines.csv' })
    archive.append(mouvementsCsv, { name: 'mouvements.csv' })
    archive.append(itemsCsv, { name: 'items.csv' })
    archive.finalize()

    // Attendre la fin de l'archivage
    await new Promise<void>((resolve, reject) => {
      archive.on('end', () => resolve())
      archive.on('error', (err) => reject(err))
    })

    const buffer = Buffer.concat(chunks)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="backup_stock_bobines_${date}.zip"`
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}