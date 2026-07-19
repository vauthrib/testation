import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const DEFAULT_CATEGORIES = [
  "Design",
  "Ergonomie",
  "Vitesse",
  "Agilité",
  "Flotabilité",
  "Résistance au jet de boue",
  "Qualité du barbecue",
  "Cheminée",
  "Sécurité",
  "Originalité",
  "Solidité",
  "Maniabilité",
];

export async function POST(request: Request) {
  try {
    const { pseudo, age, prenom } = await request.json();

    if (!pseudo || !age || !prenom) {
      return NextResponse.json({ error: "pseudo, age et prenom requis" }, { status: 400 });
    }

    // Vérifier unicité
    const existing = await prisma.contestant.findUnique({ where: { pseudo } });
    if (existing) {
      return NextResponse.json({ error: "Ce pseudo existe déjà" }, { status: 409 });
    }

    const contestant = await prisma.contestant.create({
      data: { pseudo, age: parseInt(age), prenom },
    });

    return NextResponse.json({ success: true, contestant });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Créer les catégories par défaut si besoin
    for (const name of DEFAULT_CATEGORIES) {
      await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }

    const contestants = await prisma.contestant.findMany({
      orderBy: { createdAt: "desc" },
    });

    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ contestants, categories });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
