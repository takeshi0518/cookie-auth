import { SESSION_COOKIE } from "@/lib/session";
import { findUserByCredentials } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

function safeCallbackUrl(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "/dashboard";
  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("/") || value.startsWith("/\\")) return "/dashboard";
  return value;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = safeCallbackUrl(formData.get("callbackUrl"));

  const user =
    typeof email === "string" && typeof password === "string"
      ? findUserByCredentials(email, password)
      : null;

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(
    new URL(callbackUrl, request.url),
    303
  );

  response.cookies.set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
