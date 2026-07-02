import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST() {
  try {
    // Supprimer dans l'ordre (d'abord les tables avec foreign keys)
    await prisma.mouvement.deleteMany()
    await prisma.bobine.deleteMany()
    await prisma.reception.deleteMany()
    
    return NextResponse.json({ message: 'Base de données réinitialisée' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}