import { PrismaClient } from '@prisma/client';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    let data;

    if (id) {
        data = await prisma.project.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
    } else {
        data = await prisma.project.findMany();
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
        await prisma.project.delete({
            where: {
                id: parseInt(deleteId),
            },
        });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Failed to delete Project:', error);
        return NextResponse.json({ error: 'Failed to delete Project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const createdItem = await prisma.project.create({
            data: {
                nama: body.nama,
                deskripsi: body.deskripsi,
                status: body.status,
                tanggal_mulai: body.tanggal_mulai,
                tanggal_selesai: body.tanggal_selesai
            },
        });

        return NextResponse.json(createdItem, { status: 201 });
    } catch (error) {
        console.error('Failed to create Project:', error);
        return NextResponse.json({ error: 'Failed to create Project' }, { status: 500 });
    }
}