"use server"; // don't forget to add this!

import { actionClient } from "~/lib/safe-action";
import { loginSchema } from "../schema/login-schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!existingUser) {
        return { error: "User doesn't exist" };
      }
      if (!existingUser.password) {
        return { error: "User registered using another method" };
      }
      await signIn("credentials", { email, password, redirectTo: "/" });
      return { success: "User logged in successfully" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          default:
            return { type: error.type, error: error.message };
        }
      }

      return { error: "An error occurred" };
    }
  });