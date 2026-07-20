import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const contestants = await prisma.contestant.findMany({ orderBy: { id: "asc" } });
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
    const ratings = await prisma.rating.findMany({
      include: { juror: true },
    });

    const results = contestants.map((c) => {
      const categoriesResults = categories.map((cat) => {
        const catRatings = ratings.filter(
          (r) => r.contestantId === c.id && r.categoryId === cat.id
        );

        if (catRatings.length === 0) {
          return {
            category: cat.name,
            categoryId: cat.id,
            moyenne: null,
            nbVotes: 0,
            photos: [] as string[],
          };
        }

        // Moyenne pondérée par le coefficient du jury
        let totalPondere = 0;
        let totalCoeff = 0;
        const photos: string[] = [];

        for (const r of catRatings) {
          totalPondere += r.value * r.juror.coeff;
          totalCoeff += r.juror.coeff;
          if (r.photoUrl) photos.push(r.photoUrl);
        }

        const moyenne = totalCoeff > 0
          ? Math.round((totalPondere / totalCoeff) * 100) / 100
          : null;

        return {
          category: cat.name,
          categoryId: cat.id,
          moyenne,
          nbVotes: catRatings.length,
          photos,
        };
      });

      // Moyenne générale = moyenne des moyennes pondérées
      const notes = categoriesResults.filter((r) => r.moyenne !== null);
      const moyenneGenerale =
        notes.length > 0
          ? Math.round(
              (notes.reduce((sum, n) => sum + (n.moyenne as number), 0) / notes.length) * 100
            ) / 100
          : null;

      return {
        contestant: {
          id: c.id,
          pseudo: c.pseudo,
          age: c.age,
          prenom: c.prenom,
          popularite: c.popularite,
        },
        categories: categoriesResults,
        moyenneGenerale,
        nbJurys: new Set(
          ratings.filter((r) => r.contestantId === c.id).map((r) => r.jurorId)
        ).size,
      };
    });

    return NextResponse.json({
      results,
      categories: categories.map((c) => ({ id: c.id, name: c.name })),
      totalJurors: new Set(ratings.map((r) => r.jurorId)).size,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
