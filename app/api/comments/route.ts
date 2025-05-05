import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await prisma.review.create({
      data: {
        bookId: body.bookId,
        user: body.user,
        comment: body.comment,
      },
    });

    return NextResponse.json(
      { message: "Comment added successfully", data: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
