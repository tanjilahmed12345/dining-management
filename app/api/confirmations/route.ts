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
    const date = searchParams.get("date");
    const userId = searchParams.get("userId");

    const where: Record<string, string> = {};
    if (date) where.date = date;
    if (userId) where.userId = userId;

    const confirmations = await prisma.confirmation.findMany({
      where,
      include: {
        user: {
          select: { username: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: confirmations });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const createConfirmationSchema = z.object({
  menuItemId: z.string().min(1),
  date: z.string().min(1),
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
    const { menuItemId, date } = createConfirmationSchema.parse(body);

    const existing = await prisma.confirmation.findUnique({
      where: {
        userId_menuItemId: {
          userId: user.id,
          menuItemId,
        },
      },
    });

    if (existing) {
      const updated = await prisma.confirmation.update({
        where: { id: existing.id },
        data: { confirmed: !existing.confirmed },
      });
      return NextResponse.json({ success: true, data: updated });
    }

    const confirmation = await prisma.confirmation.create({
      data: {
        userId: user.id,
        menuItemId,
        date,
        confirmed: true,
      },
    });

    return NextResponse.json({ success: true, data: confirmation }, { status: 201 });
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
