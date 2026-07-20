import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { contestantId, jurorId, ratings } = await request.json();
    // ratings = [{ categoryId, value }, ...]

    if (!contestantId || !jurorId || !ratings || !Array.isArray(ratings)) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    // Vérifier validation du jury
    const juror = await prisma.juror.findUnique({ where: { id: jurorId } });
    if (!juror) {
      return NextResponse.json({ error: "Jury introuvable" }, { status: 404 });
    }
    if (!juror.validated) {
      return NextResponse.json({ error: "Jury pas encore validé par les concurrents" }, { status: 403 });
    }

    const contestant = await prisma.contestant.findUnique({ where: { id: contestantId } });
    if (!contestant) {
      return NextResponse.json({ error: "Concurrent introuvable" }, { status: 404 });
    }

    // Upsert chaque note
    const results = [];
    for (const r of ratings) {
      if (r.value < 1 || r.value > 9) {
        return NextResponse.json({ error: "Note doit être entre 1 et 9" }, { status: 400 });
      }

      const rating = await prisma.rating.upsert({
        where: {
          contestantId_jurorId_categoryId: {
            contestantId,
            jurorId,
            categoryId: r.categoryId,
          },
        },
        update: { value: r.value, photoUrl: r.photoUrl || null },
        create: {
          contestantId,
          jurorId,
          categoryId: r.categoryId,
          value: r.value,
          photoUrl: r.photoUrl || null,
        },
      });
      results.push(rating);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ratings = await prisma.rating.findMany({
      include: {
        contestant: true,
        juror: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ratings });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
