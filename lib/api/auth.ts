import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Extracts and verifies JWT from the "token" httpOnly cookie.
 * Returns the decoded user payload or null if invalid/missing.
 */
export function getAuthUser(req: NextRequest): DecodedUser | null {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const decoded = jwt.verify(token, secret) as DecodedUser;
    return decoded;
  } catch {
    return null;
  }
}
