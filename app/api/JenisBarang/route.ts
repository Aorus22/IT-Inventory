import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    let data;

    if (id) {
        data = await prisma.jenisBarang.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } else {
        data = await prisma.jenisBarang.findMany();
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
        await prisma.jenisBarang.delete({
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

        const createdItem = await prisma.jenisBarang.create({
            data: {
                nama_jenis: body.nama_jenis
            },
        });

        return NextResponse.json(createdItem, { status: 201 });
    } catch (error) {
        console.error('Failed to create Item:', error);
        return NextResponse.json({ error: 'Failed to create Item' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        const body = await request.json();

        const updatedItem = await prisma.jenisBarang.update({
            where: { id: parseInt(id) },
            data: {
                nama_jenis: body.nama_jenis
            },
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Failed to update Item:', error);
        return NextResponse.json({ error: 'Failed to update Item' }, { status: 500 });
    }
}