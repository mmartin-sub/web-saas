import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { i18n } from "~/config/i18n-config";

const noNeedProcessRoute = [
  ".*\\.png",
  ".*\\.svg",
  ".*\\.jpg",
  ".*\\.opengraph-image.png",
];

const noRedirectRoute = ["/api(.*)", "/trpc(.*)", "/admin"];

// Only publicRoute are excluded from authentification
// Every other pages, such as /xxx will request login
const publicRoute = [
  "/(\\w{2}/)?signin(.*)",
  //Was missing, not sure why?
  "/(\\w{2}/)?register(.*)",
  "/(\\w{2}/)?terms(.*)",
  "/(\\w{2}/)?privacy(.*)",
  "/(\\w{2}/)?docs(.*)",
  "/(\\w{2}/)?external(.*)",
  "/(\\w{2}/)?blog(.*)",
  "/(\\w{2}/)?logo(.*)",
  "/(\\w{2}/)?pricing(.*)",
  "^/\\w{2}/?$", // root with locale
];

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = Array.from(i18n.locales);
  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );
  return matchLocale(languages, locales, i18n.defaultLocale);
}

function isNoRedirect(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  return noRedirectRoute.some((route) => new RegExp(route).test(pathname));
}

function isPublicPage(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  return publicRoute.some((route) => new RegExp(route).test(pathname));
}

function isNoNeedProcess(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  return noNeedProcessRoute.some((route) => new RegExp(route).test(pathname));
}

/**
 * 1、 if the request is public page and don't have locale, redirect to locale page
 * 2、 if the request is not public page and don't have locale, redirect to login page
 * 3、
 * @param request
 * @returns
 */
export default async function middleware(request: NextRequest) {
  if (isNoNeedProcess(request)) {
    return null;
  }
  const isWebhooksRoute = /^\/api\/webhooks\//.test(request.nextUrl.pathname);
  if (isWebhooksRoute) {
    return NextResponse.next();
  }
  const pathname = request.nextUrl.pathname;
  // Check if there is any supported locale in the pathname

  /*
   * 1st pass is with /, then, it will be /en
   */
  // console.log('Pathname:', pathname);

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  /*
   * 1st pass is with / -> true, then, it will be /en -> false
   */
  // console.log('Pathname missing locales:', pathnameIsMissingLocale);

  // Redirect if there is no locale
  if (!isNoRedirect(request) && pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  if (isPublicPage(request)) {
    return null;
  }
  // @ts-ignore
  return authMiddleware(request, null);
  //  return null;
}

const authMiddleware = withAuth(
  async function middlewares(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAdmin = token?.isAdmin;

    const pathname = req.nextUrl.pathname;

    // Overall, this regex matches strings that start with a forward slash, followed by at least two alphabetic characters, another forward slash, and then either login or register
    // End with either login or register
    //    Matching Pathname: /en/login or /us/register
    // Non-Matching Pathname: /login, /en/log, /123/login
    const isAuthPage = /^\/[a-zA-Z]{2,}\/(login|register)/.test(pathname);
    const isAuthRoute = /^\/api\/trpc\//.test(pathname);
    const locale = getLocale(req);

    if (isAuthRoute && isAuth) {
      return NextResponse.next();
    }
    if (pathname.startsWith("/admin/dashboard")) {
      if (!isAuth || !isAdmin)
        return NextResponse.redirect(new URL(`/admin/login`, req.url));
      return NextResponse.next();
    }
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
      }
      return null;
    }
    if (!isAuth) {
      let from = pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/${locale}/login?from=${encodeURIComponent(from)}`, req.url),
      );
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  },
);

/*
 * Config object for middleware matcher.
 * Matching Paths
 * we want pretty much everything since we need to apply the locale
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 * This regex matches any string that does not contain a dot (.) and does not contain the substring _next.
 * This regex matches strings that start with either api or trpc, followed by any characters.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    //      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    //    "/((?!.*\\..*|_next).*)",
    "/",
  ],
};
