import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body
        if (!username || !password) {
            return NextResponse.json({ error: 'Username or password is missing' }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user || user.password !== password) {
            alert("Username atau Password Invalid")
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        const sessionUser = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        return NextResponse.json({ message: 'Login successful', user: sessionUser });
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({ error: 'Login failed. Please try again later.' }, { status: 500 });
    }
}
