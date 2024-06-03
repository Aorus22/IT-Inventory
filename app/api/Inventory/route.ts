import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    let data;

    if (id) {
        data = await prisma.item.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } else {
        data = await prisma.item.findMany();
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
        await prisma.item.delete({
            where: {
                id: parseInt(deleteId),
            },
        });

        return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Failed to delete item:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const createdItem = await prisma.item.create({
            data: {
                nama: body.nama,
                jenis: body.jenis,
                deskripsi: body.deskripsi,
                stok: body.stok,
                gambar: body.gambar
            },
        });

        return NextResponse.json(createdItem, { status: 201 });
    } catch (error) {
        console.error('Failed to create Item:', error);
        return NextResponse.json({ error: 'Failed to create Item' }, { status: 500 });
    }
}