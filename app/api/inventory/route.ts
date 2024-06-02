import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET()  {
    const data = await prisma.item.findMany();
    return NextResponse.json(data);
}
