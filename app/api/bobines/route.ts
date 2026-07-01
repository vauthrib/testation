import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lieu = searchParams.get('lieu')
    
    const where = lieu ? { lieu: lieu as any } : {}
    
    const bobines = await prisma.bobine.findMany({
      where,
      include: {
        reception: true
      },
      orderBy: { code_bobine: 'asc' }
    })

    return NextResponse.json(bobines)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}