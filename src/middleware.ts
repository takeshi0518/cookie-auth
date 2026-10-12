import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "./lib/session";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    const { pathname, search } = request.nextUrl;
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
