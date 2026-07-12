import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Feedback message is required." },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        name: name.trim(),
        email: email ? email.trim() : null,
        message: message.trim(),
      },
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully.", feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
