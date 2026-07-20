import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_USER = "ben";
const ADMIN_PASS = "7595";

function checkAuth(login: string, password: string) {
  return login === ADMIN_USER && password === ADMIN_PASS;
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { login, password, name } = await request.json();
    if (!checkAuth(login, password)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Nom requis" }, { status: 400 });
    }
    const cat = await prisma.category.create({ data: { name: name.trim() } });
    return NextResponse.json({ success: true, category: cat });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Cette catégorie existe déjà" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { login, password, id, name } = await request.json();
    if (!checkAuth(login, password)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    if (!id || !name) {
      return NextResponse.json({ error: "id et name requis" }, { status: 400 });
    }
    const cat = await prisma.category.update({
      where: { id },
      data: { name: name.trim() },
    });
    return NextResponse.json({ success: true, category: cat });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { login, password, id } = await request.json();
    if (!checkAuth(login, password)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 });
    }
    await prisma.rating.deleteMany({ where: { categoryId: id } });
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
