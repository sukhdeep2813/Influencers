import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname, search } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  // Block logged-out users from dashboard routes
  if (isDashboardRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname + search
    );

    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from opening auth pages
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // Allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};