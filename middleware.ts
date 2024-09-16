// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import pb from './lib/pocketbase_client';

export async function middleware(req: NextRequest) {
    // const { pathname } = req.nextUrl;
    const { pathname, search } = req.nextUrl;

    // List of protected routes
    const privateRoutes = ['/cart', '/products/product-detail/', '/checkout', '/profile'];
    // const privateRoutes: string | string[] = [];

    const isLoggedIn = await pb.isAuthenticated(req.cookies as any);
    const isAdminLoggedIn = await pb.isAdminAuthenticated(req.cookies as any);

  
    if (privateRoutes.some(route => pathname.startsWith(route))) {
        if (!isLoggedIn && !isAdminLoggedIn) {
            const url = req.nextUrl.clone();
            url.pathname = '/login';
            
            // Encode the current URL (including search params) and add it to the redirect URL
            const from = encodeURIComponent(`${pathname}${search}`);
            url.searchParams.set('from', from);
            
            return NextResponse.redirect(url);
        }
    }

    // If the user is authenticated or the route is not protected, continue to the requested resource
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};