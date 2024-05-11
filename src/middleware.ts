import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseJwt } from "./utils/parseJwt";

export function middleware(request: NextRequest) {
	const currentToken = request.cookies.get("token")?.value
		? parseJwt(request.cookies.get("token")?.value || "")
		: "";

	const Roles: any = {
		COACH: "/coach/dashboard",
		CLIENT: "/dashboard",
		NUTRITIONIST: "/nutritionist/dashboard",
	};

	const pathname = request.nextUrl.pathname;

	console.log("current token", currentToken);
	console.log("actual path", request.nextUrl.pathname);

	//Si es una persona intentando acceder al dashboard y no tiene token, lo enviamos al login de regreso.
	if (
		!currentToken &&
		(request.nextUrl.pathname.startsWith("/dashboard") ||
			request.nextUrl.pathname.startsWith(
				"/coach/dashboard" ||
					request.nextUrl.pathname.startsWith("/nutritionist/dashboard")
			))
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Si estamos en login, mandar al usuario a su correspondiente lugar
	if (currentToken && request.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(
			new URL(Roles[currentToken.role], request.url)
		);
	}

	// Evitaremos el acceso a las diferentes areas si no tienen el acceso a las mismas
	if (currentToken && !pathname.startsWith(Roles[currentToken.role]))
		return NextResponse.redirect(
			new URL(Roles[currentToken.role], request.url)
		);

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/login/:path*",
		"/coach/dashboard/:path*",
		"/nutritionist/dashboard/:path*",
	],
};
