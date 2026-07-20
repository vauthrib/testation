import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { contestantId, jurorId } = await request.json();

    if (!contestantId || !jurorId) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    const juror = await prisma.juror.findUnique({ where: { id: jurorId } });
    if (!juror) {
      return NextResponse.json({ error: "Jury introuvable" }, { status: 404 });
    }

    // Vérifier que le jury a besoin de validation
    if (juror.type !== "DONNATEUR" && juror.type !== "FAMILY") {
      return NextResponse.json({ error: "Ce type de jury n'a pas besoin de validation" }, { status: 400 });
    }

    if (juror.validated) {
      return NextResponse.json({ error: "Déjà validé" }, { status: 409 });
    }

    // Incrémenter le compteur et vérifier si tous les concurrents ont validé
    const totalContestants = await prisma.contestant.count();
    const updated = await prisma.juror.update({
      where: { id: jurorId },
      data: { validationsCount: { increment: 1 } },
    });

    const allValidated = updated.validationsCount >= totalContestants;
    if (allValidated) {
      await prisma.juror.update({
        where: { id: jurorId },
        data: { validated: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: allValidated
        ? "✅ Jury validé par tous les concurrents !"
        : `✅ Validation enregistrée (${updated.validationsCount}/${totalContestants})`,
      validationsCount: updated.validationsCount,
      totalContestants,
      validated: allValidated,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
