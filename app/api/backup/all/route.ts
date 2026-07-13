import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function csvEscape(value: any): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(';') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toCsv(headers: string[], rows: any[][]): string {
  const lines = [headers.join(';'), ...rows.map(r => r.map(csvEscape).join(';'))]
  return lines.join('\n')
}

export async function GET() {
  try {
    const [receptions, bobines, mouvements, items] = await Promise.all([
      prisma.reception.findMany({ orderBy: { id: 'asc' } }),
      prisma.bobine.findMany({ orderBy: { id: 'asc' } }),
      prisma.mouvement.findMany({ orderBy: { id: 'asc' } }),
      prisma.itemPersonnalise.findMany({ orderBy: { id: 'asc' } })
    ])

    // Section Réceptions
    const receptionsHeaders = ['id', 'code_fournisseur', 'num_commande', 'num_type_produit', 'type_materiel',
      'diametre_fil', 'longueur_feuillard', 'largeur_feuillard', 'matiere', 'durete', 'revetement', 'date_reception']
    const receptionsRows = receptions.map(r => [
      r.id, r.code_fournisseur, r.num_commande, r.num_type_produit, r.type_materiel,
      r.diametre_fil?.toString() || '', r.longueur_feuillard?.toString() || '', r.largeur_feuillard?.toString() || '',
      r.matiere, r.durete, r.revetement, r.date_reception.toISOString()
    ])

    // Section Bobines
    const bobinesHeaders = ['id', 'reception_id', 'code_bobine', 'num_bobine', 'poids_initial', 'poids_actuel',
      'statut', 'lieu', 'num_commande_fabrication']
    const bobinesRows = bobines.map(b => [
      b.id, b.reception_id, b.code_bobine, b.num_bobine,
      b.poids_initial.toString(), b.poids_actuel.toString(),
      b.statut, b.lieu, b.num_commande_fabrication || ''
    ])

    // Section Mouvements
    const mouvementsHeaders = ['id', 'bobine_id', 'type_mouvement', 'poids_mouvement', 'n_commande_client',
      'client', 'texte_libre', 'lieu_destination', 'date_mouvement']
    const mouvementsRows = mouvements.map(m => [
      m.id, m.bobine_id, m.type_mouvement, m.poids_mouvement.toString(),
      m.n_commande_client || '', m.client || '', m.texte_libre || '',
      m.lieu_destination || '', m.date_mouvement.toISOString()
    ])

    // Section Items
    const itemsHeaders = ['id', 'categorie', 'nom', 'ordre']
    const itemsRows = items.map(i => [i.id, i.categorie, i.nom, i.ordre])

    // Construire le CSV complet avec sections
    const BOM = '\uFEFF'
    const sections = [
      '###SECTION:RECEPTIONS###',
      toCsv(receptionsHeaders, receptionsRows),
      '',
      '###SECTION:BOBINES###',
      toCsv(bobinesHeaders, bobinesRows),
      '',
      '###SECTION:MOUVEMENTS###',
      toCsv(mouvementsHeaders, mouvementsRows),
      '',
      '###SECTION:ITEMS###',
      toCsv(itemsHeaders, itemsRows)
    ].join('\n')

    const date = new Date().toISOString().split('T')[0]

    return new NextResponse(BOM + sections, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="backup_stock_bobines_${date}.csv"`
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}