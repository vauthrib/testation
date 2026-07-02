import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const bobines = await prisma.bobine.findMany({
      where: {
        lieu: 'STOCK_PRINCIPAL'
      },
      include: {
        reception: true
      }
    })

    // Grouper par Ø/matière
    const resume = bobines.reduce((acc, bobine) => {
      const r = bobine.reception
      const dimension = r.type_materiel === 'Fil' 
        ? `Ø${r.diametre_fil}`
        : `${r.largeur_feuillard}x${r.longueur_feuillard}`
      const key = `${dimension}-${r.matiere}-${r.durete}-${r.revetement}`
      
      if (!acc[key]) {
        acc[key] = {
          dimension,
          matiere: r.matiere,
          durete: r.durete,
          revetement: r.revetement,
          type: r.type_materiel,
          nombre_bobines: 0,
          poids_total: 0
        }
      }
      
      acc[key].nombre_bobines++
      acc[key].poids_total += parseFloat(bobine.poids_actuel.toString())
      
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json(Object.values(resume))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}