import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/api/auth";
import { z } from "zod";

function getDateRange(period: string | null): { start: string; end: string } | null {
  if (!period) return null;

  const now = new Date();
  const end = now.toISOString().split("T")[0];
  let start: string;

  switch (period) {
    case "weekly": {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      start = weekAgo.toISOString().split("T")[0];
      break;
    }
    case "monthly": {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      start = monthAgo.toISOString().split("T")[0];
      break;
    }
    case "yearly": {
      const yearAgo = new Date(now);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      start = yearAgo.toISOString().split("T")[0];
      break;
    }
    default:
      return null;
  }

  return { start, end };
}

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
    const period = searchParams.get("period");
    const range = getDateRange(period);

    const where = range
      ? { date: { gte: range.start, lte: range.end } }
      : {};

    const transactions = await prisma.expenseTransaction.findMany({
      where,
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const createExpenseSchema = z.object({
  date: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().min(0),
  category: z.string().optional(),
  paymentMethod: z.string().optional(),
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
    const parsed = createExpenseSchema.parse(body);

    const transaction = await prisma.expenseTransaction.create({
      data: parsed,
    });

    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
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
