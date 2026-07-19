import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { pseudo, type } = await request.json();

    if (!pseudo || !type) {
      return NextResponse.json({ error: "pseudo et type requis" }, { status: 400 });
    }

    const validTypes = ["DONNATEUR", "FAMILY", "CURIEUX"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Type invalide (DONNATEUR, FAMILY, CURIEUX)" }, { status: 400 });
    }

    const coeff = type === "DONNATEUR" ? 6 : type === "FAMILY" ? 4 : 2;

    const existing = await prisma.juror.findUnique({ where: { pseudo } });
    if (existing) {
      return NextResponse.json({ error: "Ce pseudo jury existe déjà" }, { status: 409 });
    }

    const juror = await prisma.juror.create({
      data: { pseudo, type, coeff },
    });

    return NextResponse.json({ success: true, juror });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const jurors = await prisma.juror.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ jurors });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
