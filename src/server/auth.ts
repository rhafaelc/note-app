import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { loginSchema } from "./form/login-schema";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user?.password) {
            return null;
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return null;
          }
          return user;
        }
        return null;
      },
    }),
  ],
});
