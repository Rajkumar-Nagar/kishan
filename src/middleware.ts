import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthRoutes = ['/login', '/signup'].includes(pathname);
  const session = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`, {
    headers: {
      cookie: request.headers.get('cookie') as string
    }
  }).then(res => res.json());

  if (session?.user && isAuthRoutes) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!session?.user && !isAuthRoutes) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (pathname.startsWith('/mandi') && pathname!=='/mandi/join-mandi') {
    const cookie = cookies();
    const data = cookie.get('allindiamandi')?.value ?? "";

    try {
      if (JSON.parse(data).userId !== session.user.id) {
        return NextResponse.redirect(new URL('/mandi/join-mandi', request.nextUrl))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/mandi/join-mandi', request.nextUrl))
    }
    return NextResponse.next();
  }
  // console.log(session?.user)
  // if (session?.user?.role !== 'ADMIN' && pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
    '/products/add-product',
    '/license',
    '/mandi/all-india-mandi',
    '/mandi/:path*',
    '/aiHelper/:path*',
  ],
}