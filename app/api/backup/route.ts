import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const receptions = await prisma.reception.findMany({
      include: {
        bobines: {
          include: {
            mouvements: true
          }
        }
      }
    })
    
    const items = await prisma.itemPersonnalise.findMany()

    const backup = {
      version: '1.0',
      date: new Date().toISOString(),
      receptions,
      items
    }

    return new NextResponse(JSON.stringify(backup, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="backup_stock_bobines_${new Date().toISOString().split('T')[0]}.json"`
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.receptions || !data.items) {
      return NextResponse.json({ error: 'Format de backup invalide' }, { status: 400 })
    }

    await prisma.mouvement.deleteMany()
    await prisma.bobine.deleteMany()
    await prisma.reception.deleteMany()
    await prisma.itemPersonnalise.deleteMany()

    for (const item of data.items) {
      await prisma.itemPersonnalise.create({
        data: {
          categorie: item.categorie,
          nom: item.nom,
          ordre: item.ordre
        }
      })
    }

    for (const reception of data.receptions) {
      const newReception = await prisma.reception.create({
        data: {
          code_fournisseur: reception.code_fournisseur,
          num_commande: reception.num_commande,
          num_type_produit: reception.num_type_produit,
          type_materiel: reception.type_materiel,
          diametre_fil: reception.diametre_fil,
          longueur_feuillard: reception.longueur_feuillard,
          largeur_feuillard: reception.largeur_feuillard,
          matiere: reception.matiere,
          durete: reception.durete,
          revetement: reception.revetement,
          date_reception: new Date(reception.date_reception)
        }
      })

      for (const bobine of reception.bobines) {
        const newBobine = await prisma.bobine.create({
          data: {
            reception_id: newReception.id,
            code_bobine: bobine.code_bobine,
            num_bobine: bobine.num_bobine,
            poids_initial: bobine.poids_initial,
            poids_actuel: bobine.poids_actuel,
            statut: bobine.statut,
            lieu: bobine.lieu,
            num_commande_fabrication: bobine.num_commande_fabrication
          }
        })

        for (const mouvement of bobine.mouvements) {
          await prisma.mouvement.create({
            data: {
              bobine_id: newBobine.id,
              type_mouvement: mouvement.type_mouvement,
              poids_mouvement: mouvement.poids_mouvement,
              n_commande_client: mouvement.n_commande_client,
              client: mouvement.client,
              texte_libre: mouvement.texte_libre,
              lieu_destination: mouvement.lieu_destination,
              date_mouvement: new Date(mouvement.date_mouvement)
            }
          })
        }
      }
    }

    return NextResponse.json({ message: 'Base de données restaurée avec succès' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}