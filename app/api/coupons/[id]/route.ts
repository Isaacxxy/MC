import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userID = params.id;

    if (!userID) {
      return NextResponse.json(
        { error: "ID utilisateur requis." },
        { status: 400 }
      );
    }

    const wallet = await prisma.wallet.findMany({
      where: { idUser: userID },
    });

    return NextResponse.json({ wallet }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
