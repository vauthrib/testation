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

    // Construire le where pour les mouvements
    const mouvementWhere: any = {
      date_mouvement: { gte: dateLimite },
      type_mouvement: { in: ['TRANSFERT_VERS_USINE', 'SORTIE_USINE', 'RETOUR_USINE', 'SORTIE_DECHET'] }
    }

    // Filtrer par commande si spécifié
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

    // 1️⃣ Consommation par commande fabrication
    const parCommande: Record<string, any> = {}
    // 2️⃣ Consommation par diamètre
    const parDiametre: Record<string, any> = {}
    // 3️⃣ Consommation par dureté
    const parDurete: Record<string, any> = {}

    for (const m of mouvements) {
      const b = m.bobine
      const r = b.reception
      const cmd = b.num_commande_fabrication || 'SANS_COMMANDE'
      const diam = r.diametre_fil ? `Ø${parseFloat(r.diametre_fil.toString())}` : 'N/A'
      const dur = r.durete
      const mat = r.matiere
      const poids = parseFloat(m.poids_mouvement.toString())

      // Appliquer les filtres additionnels
      if (diametre && diam !== diametre) continue
      if (durete && dur !== durete) continue
      if (matiere && mat !== matiere) continue

      // Par commande
      if (!parCommande[cmd]) {
        parCommande[cmd] = {
          commande: cmd,
          nb_mouvements: 0,
          nb_bobines: new Set<string>(),
          poids_total: 0,
          poids_usine: 0,
          poids_dechet: 0,
          poids_retour: 0,
          matieres: new Set<string>(),
          diametres: new Set<string>(),
          duretes: new Set<string>()
        }
      }
      const pc = parCommande[cmd]
      pc.nb_mouvements++
      pc.nb_bobines.add(b.code_bobine)
      pc.matieres.add(mat)
      pc.diametres.add(diam)
      pc.duretes.add(dur)

      if (m.type_mouvement === 'TRANSFERT_VERS_USINE' || m.type_mouvement === 'SORTIE_USINE') {
        pc.poids_total += poids
        pc.poids_usine += poids
      } else if (m.type_mouvement === 'SORTIE_DECHET') {
        pc.poids_total += poids
        pc.poids_dechet += poids
      } else if (m.type_mouvement === 'RETOUR_USINE') {
        pc.poids_retour += poids
      }

      // Par diamètre
      if (!parDiametre[diam]) {
        parDiametre[diam] = {
          diametre: diam,
          nb_mouvements: 0,
          poids_total: 0,
          poids_usine: 0,
          poids_dechet: 0
        }
      }
      const pd = parDiametre[diam]
      pd.nb_mouvements++
      if (m.type_mouvement === 'TRANSFERT_VERS_USINE' || m.type_mouvement === 'SORTIE_USINE') {
        pd.poids_total += poids
        pd.poids_usine += poids
      } else if (m.type_mouvement === 'SORTIE_DECHET') {
        pd.poids_total += poids
        pd.poids_dechet += poids
      }

      // Par dureté
      if (!parDurete[dur]) {
        parDurete[dur] = {
          durete: dur,
          nb_mouvements: 0,
          poids_total: 0,
          poids_usine: 0,
          poids_dechet: 0
        }
      }
      const pdu = parDurete[dur]
      pdu.nb_mouvements++
      if (m.type_mouvement === 'TRANSFERT_VERS_USINE' || m.type_mouvement === 'SORTIE_USINE') {
        pdu.poids_total += poids
        pdu.poids_usine += poids
      } else if (m.type_mouvement === 'SORTIE_DECHET') {
        pdu.poids_total += poids
        pdu.poids_dechet += poids
      }
    }

    // Convertir les Sets en tableaux et arrondir les poids
    const parCommandeArr = Object.values(parCommande).map((pc: any) => ({
      ...pc,
      nb_bobines: pc.nb_bobines.size,
      matieres: Array.from(pc.matieres),
      diametres: Array.from(pc.diametres),
      duretes: Array.from(pc.duretes),
      poids_total: Math.round(pc.poids_total * 100) / 100,
      poids_usine: Math.round(pc.poids_usine * 100) / 100,
      poids_dechet: Math.round(pc.poids_dechet * 100) / 100,
      poids_retour: Math.round(pc.poids_retour * 100) / 100
    })).sort((a: any, b: any) => b.poids_total - a.poids_total)

    const parDiametreArr = Object.values(parDiametre).map((pd: any) => ({
      ...pd,
      poids_total: Math.round(pd.poids_total * 100) / 100,
      poids_usine: Math.round(pd.poids_usine * 100) / 100,
      poids_dechet: Math.round(pd.poids_dechet * 100) / 100
    })).sort((a: any, b: any) => b.poids_total - a.poids_total)

    const parDureteArr = Object.values(parDurete).map((pd: any) => ({
      ...pd,
      poids_total: Math.round(pd.poids_total * 100) / 100,
      poids_usine: Math.round(pd.poids_usine * 100) / 100,
      poids_dechet: Math.round(pd.poids_dechet * 100) / 100
    })).sort((a: any, b: any) => b.poids_total - a.poids_total)

    return NextResponse.json({
      total_mouvements: mouvements.length,
      par_commande: parCommandeArr,
      par_diametre: parDiametreArr,
      par_durete: parDureteArr
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
