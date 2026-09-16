import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrefixed =
    pathname === "/ru" ||
    pathname === "/id" ||
    pathname.startsWith("/ru/") ||
    pathname.startsWith("/id/");

  const response = intlMiddleware(request);

  if (isPrefixed) {
    setLocaleCookie(response, pathname.startsWith("/ru") ? "ru" : "id");
  } else {
    setLocaleCookie(response, "en");
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(ru|id)/:path*",
    "/((?!api|_next|_vercel|privacy-policy|terms|.*\\..*).*)",
  ],
};
