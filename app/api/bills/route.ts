import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/api/auth";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const where = userId ? { userId } : {};

    const bills = await prisma.bill.findMany({
      where,
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const data = bills.map(({ user: u, ...rest }) => ({
      ...rest,
      userName: u?.username,
    }));

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const createBillSchema = z.object({
  userId: z.string().min(1),
  month: z.string().min(1),
  year: z.string().min(1),
  amount: z.number().min(0),
  mealCount: z.number().int().min(0),
});

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: admin only" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = createBillSchema.parse(body);

    const bill = await prisma.bill.create({
      data: parsed,
    });

    return NextResponse.json({ success: true, data: bill }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: err.errors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
