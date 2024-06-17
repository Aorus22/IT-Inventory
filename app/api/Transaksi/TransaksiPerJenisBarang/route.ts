import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const result = await prisma.jenisBarang.findMany({
            select: {
                nama_jenis: true,
                items: {
                    select: {
                        _count: {
                            select: {
                                transaksi: true
                            }
                        }
                    }
                }
            }
        });

        const jumlahTransaksiPerJenis = result.map(item => ({
            jenis_barang: item.nama_jenis,
            jumlah_transaksi: item.items.reduce((acc, curr) => acc + curr._count.transaksi, 0)
        }));

        return NextResponse.json(jumlahTransaksiPerJenis);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
