import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface MonthlyTransaction {
    nama_bulan: string;
    jumlah_transaksi: number;
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const jenis = url.searchParams.get('jenis');
        const currentYear = new Date().getFullYear();

        const transactions = await prisma.transaksi.findMany({
            where: {
                jenis_transaksi: jenis || "",
                AND: {
                    tanggal: {
                        gte: new Date(`${currentYear}-01-01`),
                        lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            select: {
                id: true,
                tanggal: true
            }
        });

        const groupedTransactions: Record<string, number> = {};
        transactions.forEach(transaction => {
            const month = transaction.tanggal.getMonth() + 1;
            const monthKey = month.toString();
            if (!groupedTransactions[monthKey]) {
                groupedTransactions[monthKey] = 0;
            }
            groupedTransactions[monthKey]++;
        });

        const result: MonthlyTransaction[] = [];
        Object.keys(groupedTransactions).forEach(month => {
            result.push({
                nama_bulan: getMonthName(parseInt(month)),
                jumlah_transaksi: groupedTransactions[month]
            });
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

function getMonthName(month: number): string {
    const monthNames: string[] = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[month - 1];
}
