import bcrypt from "bcryptjs";
import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/models/user";
import { z } from "zod";

await connectDB();

// Define Zod schema
const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

// GET all users
export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to get users" },
      { status: 500 }
    );
  }
}

// POST a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input using zod
    const { username, email, password } = registerSchema.parse(body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminEmails = ["admin@gmail.com"];
    const role = adminEmails.includes(email) ? "admin" : "user";

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
  } catch (err: any) {
    console.log(err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input data", errors: err.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: false, error: err.message || "Failed to create user" },
      { status: 500 }
    );
  }
}