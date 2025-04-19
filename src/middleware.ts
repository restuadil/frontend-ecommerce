import { env } from "@/config/env";
import { IJWTExtended } from "@/types/auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  const token: IJWTExtended | null = await getToken({
    req,
    secret: env.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth/")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));

      return NextResponse.redirect(url);
    } else if (token.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"],
};
