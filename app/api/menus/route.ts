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

    const menuItems = await prisma.menuItem.findMany({
      orderBy: { date: "desc" },
      include: {
        ratings: {
          select: { rating: true },
        },
      },
    });

    const data = menuItems.map((item) => {
      const { ratings, ...rest } = item;
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : null;
      return { ...rest, averageRating: avgRating };
    });

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const createMenuSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(""),
  date: z.string().min(1),
  dayOfWeek: z.string().min(1),
  mealType: z.string().min(1),
  active: z.boolean().optional().default(true),
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
    const parsed = createMenuSchema.parse(body);

    const menuItem = await prisma.menuItem.create({
      data: parsed,
    });

    return NextResponse.json({ success: true, data: menuItem }, { status: 201 });
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
