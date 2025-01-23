import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Get cookies from the request
  const isAdmin = request.cookies.get('isAdmin')?.value === 'true'; // Ensure you check for 'true'

  // If not an admin and accessing the /admin route, redirect to /login
  if (!isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl); // Redirect to /login
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware only to admin routes
};
