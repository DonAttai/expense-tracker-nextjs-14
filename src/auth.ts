import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/sign-in-schema";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

import db from "./lib/db";
import { compare } from "bcryptjs";
import { getUser } from "./lib/server-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        if (email && password) {
          const user = await getUser(email);

          if (!user) return null;
          if (!user.password) return null;

          // log user in if user exists
          if (user && (await compare(password, user.password!))) {
            const { password, ...userWithoutPasssword } = user;
            return userWithoutPasssword;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
