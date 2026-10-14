import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "./lib/session";
import { unsign } from "./lib/sign";

export async function middleware(request: NextRequest) {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const userId = raw ? await unsign(raw) : null;

  if (!userId) {
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
