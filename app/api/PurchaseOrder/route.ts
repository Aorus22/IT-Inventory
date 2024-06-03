import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    let data;

    if (id) {
        data = await prisma.purchaseOrder.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'Purchase Order not found' }, { status: 404 });
        }
    } else {
        data = await prisma.purchaseOrder.findMany();
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
        await prisma.purchaseOrder.delete({
            where: {
                id: parseInt(deleteId),
            },
        });

        return NextResponse.json({ message: 'Purchase Order deleted successfully' });
    } catch (error) {
        console.error('Failed to delete Purchase Order:', error);
        return NextResponse.json({ error: 'Failed to delete Purchase Order' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const createdPO = await prisma.purchaseOrder.create({
            data: {
                nama: body.nama,
                deskripsi: body.deskripsi,
                tanggal: body.tanggal,
                status: body.status
            },
        });

        return NextResponse.json(createdPO, { status: 201 });
    } catch (error) {
        console.error('Failed to create Purchase Order:', error);
        return NextResponse.json({ error: 'Failed to create Purchase Order'}, { status: 500 });
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

        const updatedPO = await prisma.purchaseOrder.update({
            where: { id: parseInt(id) },
            data: {
                nama: body.nama,
                deskripsi: body.deskripsi,
                tanggal: body.tanggal,
                status: body.status
            },
        });

        return NextResponse.json(updatedPO);
    } catch (error) {
        console.error('Failed to update Purchase Order:', error);
        return NextResponse.json({ error: 'Failed to update Purchase Order' }, { status: 500 });
    }
}