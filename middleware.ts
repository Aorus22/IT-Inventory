import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const sessionUser = request.cookies.get('sessionUser');

    const protectedRoutes = [
        '/Inventory',
        '/Project',
        '/Transaksi',
        '/JenisBarang',
        '/PurchaseOrder',
        '/KonfirmasiTransaksi',
        '/KonfirmasiPurchaseOrder'
    ];

    const isProtectedChildRoute = protectedRoutes.some(route => url.pathname.startsWith(`${route}/`));
    const isGetMethod = request.method === 'GET' || request.method === 'POST';

    if (!sessionUser) {
        if (!isGetMethod) {
            return NextResponse.json({ message: 'Unauthorized operation' }, { status: 401 });
        }

        if (isProtectedChildRoute) {
            return NextResponse.redirect(new URL('/Unauthorized', request.url));
        }

        if(['/KonfirmasiTransaksi', '/KonfirmasiPurchaseOrder'].includes(url.pathname)){
            return NextResponse.redirect(new URL('/Unauthorized', request.url));
        }

        return NextResponse.next();
    }

    const user = JSON.parse(sessionUser.value);
    const { role } = user;

    if (role === 'admin' && ['/KonfirmasiTransaksi', '/KonfirmasiPurchaseOrder'].includes(url.pathname)) {
        return NextResponse.redirect(new URL('/Unauthorized', request.url));
    }

    if (role === 'superadmin') {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/Inventory/:path*',
        '/Project/:path*',
        '/Transaksi/:path*',
        '/JenisBarang/:path*',
        '/PurchaseOrder/:path*',
        '/KonfirmasiTransaksi/:path*',
        '/KonfirmasiPurchaseOrder/:path*',
        '/api/:path*'
    ],
};
