import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_USER = "ben";
const ADMIN_PASS = "7595";

export async function POST(request: Request) {
  try {
    const { login, password, action } = await request.json();

    if (login !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    if (action === "delete_contestants") {
      await prisma.rating.deleteMany({});
      await prisma.contestant.deleteMany({});
      return NextResponse.json({ success: true, message: "Tous les concurrents ont été supprimés" });
    }

    if (action === "delete_jurors") {
      await prisma.rating.deleteMany({});
      await prisma.juror.deleteMany({});
      return NextResponse.json({ success: true, message: "Tous les jurys ont été supprimés" });
    }

    if (action === "delete_all") {
      await prisma.rating.deleteMany({});
      await prisma.contestant.deleteMany({});
      await prisma.juror.deleteMany({});
      return NextResponse.json({ success: true, message: "Tous les concurrents et jurys ont été supprimés" });
    }

    return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
