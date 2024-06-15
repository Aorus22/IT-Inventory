import {NextRequest, NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;
        if (!username || !password) {
            return NextResponse.json({ error: 'Username or password is missing' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        const sessionUser = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const response = NextResponse.json({ message: 'Login successful', user: sessionUser });
        response.cookies.set('sessionUser', JSON.stringify(sessionUser), { httpOnly: true, secure: true });
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({ error: 'Login failed. Please try again later.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const sessionUserCookie = request.cookies.get('sessionUser');

        if (!sessionUserCookie) {
            return NextResponse.json({ error: 'Session user cookie not found' }, { status: 404 });
        }

        const sessionUser = JSON.parse(sessionUserCookie.value);
        return NextResponse.json({ sessionUser });
    } catch (error) {
        console.error('Failed to retrieve sessionUser cookie:', error);
        return NextResponse.json({ error: 'Failed to retrieve sessionUser cookie' }, { status: 500 });
    }
}
