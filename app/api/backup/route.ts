import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Échappement CSV : met entre guillemets si contient ; " ou \n
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const table = searchParams.get('table')

    if (table === 'receptions') {
      const receptions = await prisma.reception.findMany({ orderBy: { id: 'asc' } })
      const headers = ['id', 'code_fournisseur', 'num_commande', 'num_type_produit', 'type_materiel',
        'diametre_fil', 'longueur_feuillard', 'largeur_feuillard', 'matiere', 'durete', 'revetement', 'date_reception']
      const rows = receptions.map(r => [
        r.id, r.code_fournisseur, r.num_commande, r.num_type_produit, r.type_materiel,
        r.diametre_fil?.toString() || '', r.longueur_feuillard?.toString() || '', r.largeur_feuillard?.toString() || '',
        r.matiere, r.durete, r.revetement, r.date_reception.toISOString()
      ])
      return new NextResponse(toCsv(headers, rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="receptions.csv"'
        }
      })
    }

    if (table === 'bobines') {
      const bobines = await prisma.bobine.findMany({ orderBy: { id: 'asc' } })
      const headers = ['id', 'reception_id', 'code_bobine', 'num_bobine', 'poids_initial', 'poids_actuel',
        'statut', 'lieu', 'num_commande_fabrication']
      const rows = bobines.map(b => [
        b.id, b.reception_id, b.code_bobine, b.num_bobine,
        b.poids_initial.toString(), b.poids_actuel.toString(),
        b.statut, b.lieu, b.num_commande_fabrication || ''
      ])
      return new NextResponse(toCsv(headers, rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="bobines.csv"'
        }
      })
    }

    if (table === 'mouvements') {
      const mouvements = await prisma.mouvement.findMany({ orderBy: { id: 'asc' } })
      const headers = ['id', 'bobine_id', 'type_mouvement', 'poids_mouvement', 'n_commande_client',
        'client', 'texte_libre', 'lieu_destination', 'date_mouvement']
      const rows = mouvements.map(m => [
        m.id, m.bobine_id, m.type_mouvement, m.poids_mouvement.toString(),
        m.n_commande_client || '', m.client || '', m.texte_libre || '',
        m.lieu_destination || '', m.date_mouvement.toISOString()
      ])
      return new NextResponse(toCsv(headers, rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="mouvements.csv"'
        }
      })
    }

    if (table === 'items') {
      const items = await prisma.itemPersonnalise.findMany({ orderBy: { id: 'asc' } })
      const headers = ['id', 'categorie', 'nom', 'ordre']
      const rows = items.map(i => [i.id, i.categorie, i.nom, i.ordre])
      return new NextResponse(toCsv(headers, rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="items.csv"'
        }
      })
    }

    return NextResponse.json({ error: 'Table invalide. Utiliser: receptions, bobines, mouvements, items' }, { status: 400 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}