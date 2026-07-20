import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { pseudo, password } = await request.json();

    if (!pseudo || !password) {
      return NextResponse.json({ error: "Pseudo et mot de passe requis" }, { status: 400 });
    }

    const contestant = await prisma.contestant.findUnique({
      where: { pseudo },
    });

    if (!contestant) {
      return NextResponse.json({ error: "Concurrent introuvable" }, { status: 404 });
    }

    if (contestant.password !== password) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      contestant: {
        id: contestant.id,
        pseudo: contestant.pseudo,
        prenom: contestant.prenom,
        age: contestant.age,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
