import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import "next-auth/jwt";
import { encode, decode } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  ...authConfig,
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (user) {
        token.role = (user as any).role;
        token.id = user?.id as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;

      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Ensure you are redirecting to a valid path
    //   return baseUrl;
    // },
  },
  secret: process.env.AUTH_SECRET,
  // pages: {
  //   signIn: "/signin",
  // },
});
