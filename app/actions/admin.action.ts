"use server";

import { prisma } from "@/lib/db";

interface Data {
    username: string;
    email: string;
    role: string;
}

export async function setAdminCurrentRole(data: Data) {
    try {
        await prisma.adminRole.upsert({
            where: { email: data.email },
            update: { currentRole: data.role === "admin" ? "admin" : "user" },
            create: {
                email: data.email,
                currentRole: data.role === "admin" ? "admin" : "user",
            },
        });

        return {
            success: true,
            message: "Admin current role updated",
        };
    } catch {
        return { success: false, message: "Failed to set admin role" };
    }
}

export async function deleteAdminCurrentRole(data: Data) {
    try {
        await prisma.adminRole.deleteMany({
            where: { email: data.email },
        });

        return {
            success: true,
            message: "Deleted admin current role",
        };
    } catch {
        return { success: false, message: "Failed to delete admin role" };
    }
}
