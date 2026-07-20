import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const contestants = await prisma.contestant.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, pseudo: true, prenom: true, age: true },
    });

    const jurors = await prisma.juror.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, pseudo: true, type: true, coeff: true, validated: true, validationsCount: true },
    });

    return NextResponse.json({ contestants, jurors });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
