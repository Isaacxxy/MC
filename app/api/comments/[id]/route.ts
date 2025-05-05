import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//OK
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idBook = parseInt(params.id);

    const review = await prisma.review.findMany({
      where: { bookId: idBook },
    });

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}


