/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parseJwt } from './utils/parseJwt';

export function middleware(request: NextRequest) {
  const currentToken = request.cookies.get('token')?.value
    ? parseJwt(request.cookies.get('token')?.value || '')
    : '';
  const user = JSON.parse(request.cookies.get('user')?.value || '{}');

  const Roles: any = {
    COACH: '/coach/dashboard',
    CLIENT: '/dashboard',
    ADMIN: '/admin/dashboard',
    NUTRITIONIST: '/nutritionist/dashboard',
  };

  const pathname = request.nextUrl.pathname;

  //Si es una persona intentando acceder al dashboard y no tiene token, lo enviamos al login de regreso.
  if (
    !currentToken &&
    (request.nextUrl.pathname.startsWith(Roles.CLIENT) ||
      request.nextUrl.pathname.startsWith(Roles.COACH) ||
      request.nextUrl.pathname.startsWith(Roles.NUTRITIONIST) ||
      request.nextUrl.pathname.startsWith(Roles.ADMIN))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si estamos en login, mandar al usuario a su correspondiente lugar
  if (currentToken && request.nextUrl.pathname.startsWith('/login')) {
    if (user?.user?.roles == 'CLIENT' && user?.user?.firstTimeLogin == true) {
      return NextResponse.redirect(new URL('/custom-form', request.url));
    }

    if (
      (user?.user?.roles == 'CLIENT' && !user?.client?.subscription.status) ||
      user?.client?.subscription.status != 'ACTIVE'
    ) {
      return NextResponse.redirect(
        new URL('/subscription-process', request.url)
      );
    }

    return NextResponse.redirect(
      new URL(Roles[currentToken.role], request.url)
    );
  }

  // Evitaremos el acceso a las diferentes areas si no tienen el acceso a las mismas
  if (currentToken && !pathname.startsWith(Roles[currentToken.role])) {
    if (user.user.roles === 'CLIENT' && user.user.firstTimeLogin == true) {
      return NextResponse.redirect(new URL('/custom-form', request.url));
    }

    if (
      (user?.user?.roles == 'CLIENT' && !user?.client?.subscription) ||
      user.client.subscription.status != 'ACTIVE' // status: ACTIVE, APPROVAL_PENDING, Manual Cancelled
    ) {
      return NextResponse.redirect(
        new URL('/subscription-process', request.url)
      );
    }

    return NextResponse.redirect(
      new URL(Roles[currentToken.role], request.url)
    );
  }

  if (
    user?.user?.roles == 'CLIENT' &&
    user?.user?.firstTimeLogin == true &&
    pathname.startsWith(Roles[currentToken.role])
  ) {
    return NextResponse.redirect(new URL('/custom-form', request.url));
  }

  if (
    user?.user?.roles == 'CLIENT' &&
    !user?.client?.subscription &&
    user.client.subscription.status != 'ACTIVE' &&
    pathname.startsWith(Roles[currentToken.role])
  ) {
    return NextResponse.redirect(new URL('/subscription-process', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login/:path*',
    '/coach/dashboard/:path*',
    '/nutritionist/dashboard/:path*',
    '/admin/dashboard/:path*',
  ],
};
