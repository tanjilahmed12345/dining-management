import { getUserModel } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { email, password } = loginSchema.parse(body);

    const User = await getUserModel();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        user: { email: user.email, username: user.username, role: user.role },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });

    return response;
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input data", errors: err.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
};
