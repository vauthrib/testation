import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const commande = searchParams.get('commande') || undefined
    const diametre = searchParams.get('diametre') || undefined
    const durete = searchParams.get('durete') || undefined
    const matiere = searchParams.get('matiere') || undefined
    const mois = parseInt(searchParams.get('mois') || '12')

    const dateLimite = new Date()
    dateLimite.setMonth(dateLimite.getMonth() - mois)

    const mouvementWhere: any = {
      date_mouvement: { gte: dateLimite },
      type_mouvement: { in: ['TRANSFERT_VERS_USINE', 'SORTIE_USINE', 'RETOUR_USINE', 'SORTIE_DECHET'] }
    }

    if (commande) {
      mouvementWhere.bobine = { num_commande_fabrication: { contains: commande, mode: 'insensitive' } }
    }

    const mouvements = await prisma.mouvement.findMany({
      where: mouvementWhere,
      include: {
        bobine: {
          include: { reception: true }
        }
      },
      orderBy: { date_mouvement: 'desc' }
    })

    // Appliquer les filtres
    const filtres = mouvements.filter(m => {
      const r = m.bobine.reception
      if (diametre && r.diametre_fil) {
        const d = `Ø${parseFloat(r.diametre_fil.toString())}`
        if (d !== diametre) return false
      }
      if (durete && r.durete !== durete) return false
      if (matiere && r.matiere !== matiere) return false
      return true
    })

    // Header large avec toutes les colonnes
    const headers = [
      'Date', 'Code Bobine', 'Type Mouvement', 'Poids (kg)',
      'N° Commande Fabrication', 'Fournisseur', 'Commande Récep.',
      'Type', 'Dimension', 'Matière', 'Dureté', 'Revêtement',
      'Destination', 'Note'
    ]

    const rows = filtres.map(m => {
      const b = m.bobine
      const r = b.reception
      const dim = r.type_materiel === 'Fil'
        ? `Ø${r.diametre_fil}`
        : `${r.largeur_feuillard}x${r.longueur_feuillard}`

      return [
        m.date_mouvement.toISOString().replace('T', ' ').substring(0, 16),
        b.code_bobine,
        m.type_mouvement,
        m.poids_mouvement.toString(),
        b.num_commande_fabrication || '',
        r.code_fournisseur,
        `${r.num_commande}-${r.num_type_produit}`,
        r.type_materiel,
        dim,
        r.matiere,
        r.durete,
        r.revetement,
        m.lieu_destination || '',
        m.texte_libre || ''
      ].join(';')
    })

    // Agrégations
    const totalPoids = filtres.reduce((s, m) => s + parseFloat(m.poids_mouvement.toString()), 0)
    const usine = filtres.filter(m => m.type_mouvement === 'TRANSFERT_VERS_USINE' || m.type_mouvement === 'SORTIE_USINE')
      .reduce((s, m) => s + parseFloat(m.poids_mouvement.toString()), 0)
    const dechet = filtres.filter(m => m.type_mouvement === 'SORTIE_DECHET')
      .reduce((s, m) => s + parseFloat(m.poids_mouvement.toString()), 0)
    const retour = filtres.filter(m => m.type_mouvement === 'RETOUR_USINE')
      .reduce((s, m) => s + parseFloat(m.poids_mouvement.toString()), 0)

    rows.push('')
    rows.push('RÉCAPITULATIF CONSOMMATION')
    rows.push(`Période: ${dateLimite.toLocaleDateString('fr-FR')} - ${new Date().toLocaleDateString('fr-FR')}`)
    rows.push(`Nombre de mouvements: ${filtres.length}`)
    rows.push(`Total envoyé usine: ${usine.toFixed(2)} kg`)
    rows.push(`Total déchets: ${dechet.toFixed(2)} kg`)
    rows.push(`Total retours stock: ${retour.toFixed(2)} kg`)
    rows.push(`Poids net consommé (usine - retours): ${(usine - retour).toFixed(2)} kg`)
    rows.push(`Poids total mouvementé: ${totalPoids.toFixed(2)} kg`)

    const csv = [headers.join(';'), ...rows].join('\n')
    const BOM = '\uFEFF'

    const filename = commande
      ? `consommation_detail_${commande}.csv`
      : `consommation_detail.csv`

    return new NextResponse(BOM + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
