import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
  role: z.enum(["admin", "user"]).optional(),
});

// GET - fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to get users" },
      { status: 500 }
    );
  }
}

// POST - register a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, role } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    return NextResponse.json(
      { success: true, message: "User created successfully!" },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input data", errors: err.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to create user" },
      { status: 500 }
    );
  }
}
