import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const sessionUser = request.cookies.get('sessionUser');

    if (!sessionUser) {
        if (url.pathname !== '/login') {
            return NextResponse.redirect(new URL('/Unauthorized', request.url));
        }
        return NextResponse.next();
    }

    const user = JSON.parse(sessionUser.value);
    const { role } = user;

    if (role === 'admin' && !['/Inventory', '/Unauthorized'].includes(url.pathname)) {
        return NextResponse.redirect(new URL('/Unauthorized', request.url));
    }

    if (role === 'superadmin') {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/Inventory', '/Project', '/Transaksi', '/PurchaseOrder'],
};
