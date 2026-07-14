import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const START_HOUR = 7
const START_MINUTE = 30
const END_HOUR = 18
const END_MINUTE = 0

export async function POST(request: NextRequest) {
  try {
    const { login, password, appareil } = await request.json()

    // Récupérer l'utilisateur depuis la DB
    const user = await prisma.user.findUnique({
      where: { login }
    })

    if (!user || user.password !== password) {
      return NextResponse.json({ valid: false, error: 'Login ou mot de passe incorrect' }, { status: 401 })
    }

    if (!user.actif) {
      return NextResponse.json({ valid: false, error: 'Compte désactivé' }, { status: 403 })
    }

    // Vérifier l'heure (sauf pour les super users)
    if (!user.isSuper) {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      const startTime = START_HOUR * 60 + START_MINUTE
      const endTime = END_HOUR * 60 + END_MINUTE

      if (currentTime < startTime || currentTime >= endTime) {
        return NextResponse.json({ 
          valid: false, 
          error: `Connexion autorisée uniquement de ${START_HOUR}h${START_MINUTE.toString().padStart(2, '0')} à ${END_HOUR}h${END_MINUTE.toString().padStart(2, '0')}` 
        }, { status: 403 })
      }
    }

    // Enregistrer dans l'historique (limiter à 1000 entrées)
    try {
      const count = await prisma.connectionLog.count()
      if (count >= 1000) {
        const oldest = await prisma.connectionLog.findMany({
          orderBy: { date_connexion: 'asc' },
          take: 100
        })
        await prisma.connectionLog.deleteMany({
          where: { id: { in: oldest.map(l => l.id) } }
        })
      }

      await prisma.connectionLog.create({
        data: {
          utilisateur: user.login,
          appareil: appareil || 'Inconnu',
          ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null
        }
      })
    } catch (logError) {
      console.error('Erreur logging:', logError)
    }

    return NextResponse.json({ 
      valid: true, 
      user: user.login,
      isSuper: user.isSuper,
      isAdmin: user.isAdmin
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}