// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import pb from './lib/pocketbase_client';
export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    // List of protected routes
    const publicRoutes = ['/', '/admin/login', '/login'];

    const response = NextResponse.next();
    const isLoggedIn = await pb.isAuthenticated(req.cookies as any);
    const isAdminLoggedIn = await pb.isAdminAuthenticated(req.cookies as any);


    // if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/admin/login") || req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/voter/permit") ) {
    //     if (isLoggedIn) {
    //         if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/admin/login")){
    //             return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    //         }else{
    //             // Will be changed latter
    //             // const user = await pb.getUser(req.cookies)
    //             // return NextResponse.redirect(new URL(`/login`, req.url));
    //         }
    //     }
    //     return;
    // }
    if (!publicRoutes.includes(pathname)) {
        if (!isLoggedIn && !isAdminLoggedIn) {
            const url = req.nextUrl.clone()
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }
    // console.log(pb.client.authStore.model)
    // If the user is authenticated or the route is not protected, continue to the requested resource
    return NextResponse.next();
}

export const config = {
    matcher:  ['/((?!api|_next/static|_next/image|favicon.ico).*)'],

};