import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("sessionUser");
        return response;
    } catch (error) {
        console.error("Logout failed:", error);
        return NextResponse.json({ error: "Logout failed. Please try again later." }, { status: 500 });
    }
}