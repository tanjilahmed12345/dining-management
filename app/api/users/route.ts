import { getUserModel } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export async function GET() {
  try {
    const User = await getUserModel();
    const users = await User.find();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to get users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { username, email, password } = registerSchema.parse(body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminEmails = ["admin@gmail.com"];
    const role = adminEmails.includes(email) ? "admin" : "user";
    const User = await getUserModel();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.log(err);

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
