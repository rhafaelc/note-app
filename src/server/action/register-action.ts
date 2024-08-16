"use server"; // don't forget to add this!

import { actionClient } from "~/lib/safe-action";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { registerSchema } from "../form/register-schema";
import bcrypt from "bcrypt";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        return { error: "User already exists" };
      }
      const pwHash = await bcrypt.hash(password, 10);
      const newUser = await db
        .insert(users)
        .values({
          email,
          name,
          password: pwHash,
        })
        .returning();

      if (!newUser) {
        return { error: "An error occurred while registering the user" };
      }

      return { success: "User registered successfully" };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  });
