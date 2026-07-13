import { NextRequest, NextResponse } from 'next/server'

const ACCESS_CODE = process.env.ACCESS_CODE || '1234'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (code === ACCESS_CODE) {
      return NextResponse.json({ valid: true })
    }
    
    return NextResponse.json({ valid: false, error: 'Code incorrect' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}