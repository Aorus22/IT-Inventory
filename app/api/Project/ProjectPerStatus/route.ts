import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const result = await prisma.project.groupBy({
            by: ['status'],
            _count: {
                status: true
            }
        });

        const jumlahProyekPerStatus = result.map(item => ({
            status: item.status,
            jumlah: item._count.status
        }));

        return NextResponse.json(jumlahProyekPerStatus);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
