import { connectDB } from "@/helper/db";
import { getUserModel } from "@/models/user";
// import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

await connectDB();

// Define Zod schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate using zod
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "ji2b3on1e45on8ek6@ma43ra" as string,
      { expiresIn: "3d" }
    );

    const response = NextResponse.json(
      { success: true, message: "Logged in successfully", user:{email:user.email, username: user.username, role: user.role} },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/", 
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;
  } catch (err: any) {
    console.error(err);

    // Handle Zod validation error separately
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input data", errors: err.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server Error", error: err.message },
      { status: 500 }
    );
  }
};