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
    const menuItemId = searchParams.get("menuItemId");
    const userId = searchParams.get("userId");

    const where: Record<string, string> = {};
    if (menuItemId) where.menuItemId = menuItemId;
    if (userId) where.userId = userId;

    const ratings = await prisma.mealRating.findMany({
      where,
    });

    return NextResponse.json({ success: true, data: ratings });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const createRatingSchema = z.object({
  menuItemId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().optional(),
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

    const body = await req.json();
    const { menuItemId, rating, feedback } = createRatingSchema.parse(body);

    const mealRating = await prisma.mealRating.upsert({
      where: {
        userId_menuItemId: {
          userId: user.id,
          menuItemId,
        },
      },
      update: {
        rating,
        feedback: feedback ?? null,
      },
      create: {
        userId: user.id,
        menuItemId,
        rating,
        feedback: feedback ?? null,
      },
    });

    return NextResponse.json({ success: true, data: mealRating });
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
