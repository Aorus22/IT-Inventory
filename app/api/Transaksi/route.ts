import {PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
import {Transaksi} from "@/app/Transaksi/page";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    let data;

    if (id) {
        data = await prisma.transaksi.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'Transaksi not found' }, { status: 404 });
        }
    } else {
        data = await prisma.transaksi.findMany();
    }

    return NextResponse.json(data);
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const deleteId = url.searchParams.get('id');

    if (!deleteId) {
        return NextResponse.json({ error: 'Missing delete ID' }, { status: 400 });
    }

    try {
        await prisma.transaksi.delete({
            where: {
                id: parseInt(deleteId),
            },
        });

        return NextResponse.json({ message: 'Transaksi deleted successfully' });
    } catch (error) {
        console.error('Failed to delete Transaksi:', error);
        return NextResponse.json({ error: 'Failed to delete Transaksi' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const createdTransaksi = await prisma.transaksi.create({
            data: {
                nama: body.nama,
                kuantitas: body.kuantitas,
                tanggal: body.tanggal,
                status: body.status,
            },
        });

        return NextResponse.json(createdTransaksi, { status: 201 });
    } catch (error) {
        console.error('Failed to create Transaksi:', error);
        return NextResponse.json({ error: 'Failed to create Transaksi' }, { status: 500 });
    }
}