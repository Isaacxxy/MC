import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await (
      await clerkClient()
    ).users.getUserList({
      limit: 10,
      orderBy: "created_at",
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error"), { status: 500 };
  }
}
