import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const uid = request.cookies.get('uid');
  console.log(uid);

  // if (!uid) {
  // const url = request.nextUrl.clone();
  // if (url.pathname !== '/auth') {
  // url.pathname = '/auth';
  // return NextResponse.redirect(url);
  // }
  // }

  return NextResponse.next();
}
