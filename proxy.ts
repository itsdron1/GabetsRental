import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import {
  isCrawlerUserAgent,
  preferredLocaleFromAcceptLanguage,
} from "@/i18n/locale";
import { isAppLocale, routing } from "@/i18n/routing";

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

  if (isCrawlerUserAgent(request.headers.get("user-agent"))) {
    return intlMiddleware(request);
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const hasCookie = isAppLocale(cookieLocale);

  if (!hasCookie && !isPrefixed) {
    const preferred = preferredLocaleFromAcceptLanguage(
      request.headers.get("accept-language"),
    );

    if (preferred !== "en") {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
      const response = NextResponse.redirect(url);
      setLocaleCookie(response, preferred);
      return response;
    }

    const response = intlMiddleware(request);
    setLocaleCookie(response, "en");
    return response;
  }

  const response = intlMiddleware(request);
  if (isPrefixed) {
    setLocaleCookie(response, pathname.startsWith("/ru") ? "ru" : "id");
  } else if (!hasCookie) {
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
