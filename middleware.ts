import authConfig from "@/auth.config";
import NextAuth, { Session } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./route";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    salt: "authjs.session-token",
  });

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
