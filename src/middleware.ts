// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const uidCookie = request.cookies.get('uid');
  if (!uidCookie) {
    return NextResponse.redirect(new URL('sign-in', request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/new-listing', '/saved'],
};
