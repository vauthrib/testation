import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const contestantId = parseInt(id);

    await prisma.contestant.update({
      where: { id: contestantId },
      data: { popularite: { increment: 1 } },
    });

    const updated = await prisma.contestant.findUnique({
      where: { id: contestantId },
      select: { pseudo: true, popularite: true },
    });

    return NextResponse.json({ success: true, popularite: updated?.popularite, pseudo: updated?.pseudo });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const contestantId = parseInt(id);

    const contestant = await prisma.contestant.findUnique({
      where: { id: contestantId },
      select: { pseudo: true, popularite: true },
    });

    if (!contestant) {
      return NextResponse.json({ error: "Introuvable" }, { status: 404 });
    }

    return NextResponse.json({ pseudo: contestant.pseudo, popularite: contestant.popularite });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
