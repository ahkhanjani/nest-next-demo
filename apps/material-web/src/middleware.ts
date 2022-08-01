import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const uid = request.cookies.get('uid');

  if (!uid) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
