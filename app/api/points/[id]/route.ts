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

    let userPoints = await prisma.userPoints.findUnique({
      where: { idUser: userID },
    });

    if (!userPoints) {
      userPoints = await prisma.userPoints.create({
        data: {
          idUser: userID,
          points: 0,
        },
      });
    }

    return NextResponse.json({ points: userPoints.points }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
export async function PUT(
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

    const body = await req.json();
    const { points } = body;

    if (typeof points !== "number" || points < 0) {
      return NextResponse.json({ error: "Points invalides." }, { status: 400 });
    }

    // Vérification que l'utilisateur existe
    const userExists = await prisma.userPoints.findUnique({
      where: { idUser: userID },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    console.log(`Updating points for user ${userID} to ${points}`);

    const updatedUserPoints = await prisma.userPoints.update({
      where: { idUser: userID },
      data: { points },
    });

    return NextResponse.json(
      { points: updatedUserPoints.points },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour des points:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour des points." },
      { status: 500 }
    );
  }
}
