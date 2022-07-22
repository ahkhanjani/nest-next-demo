import { validateToken } from 'fm/shared-feature-auth';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
  const token = req.headers['Authorization'];
  const isLoggedIn = validateToken(token);

  if (isLoggedIn) {
    return new NextResponse('Access granted', { status: 200 });
  }

  return NextResponse.redirect('/auth');
}
