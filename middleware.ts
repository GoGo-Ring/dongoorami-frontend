import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.headers.get('authorization') as string;
  const pathUrl = req.nextUrl.pathname;

  if (accessToken && pathUrl.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!accessToken && !pathUrl.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/users/:path*', '/message/:path*', '/register/:path*'],
};
