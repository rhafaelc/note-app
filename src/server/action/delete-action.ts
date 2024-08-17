"use server";

import { z } from "zod";
import { actionClient } from "~/lib/safe-action";
import { db } from "../db";
import { notes, users } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = z.object({
  id: z.string(),
});

export const deleteAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deletedNote = await db
        .delete(notes)
        .where(eq(notes.id, id))
        .returning();
      if (!deletedNote[0]) {
        return { error: "Can't delete the note" };
      }
      revalidatePath("/");
      await db.update(users).set({
        noteLimit: sql`${users.noteLimit} + 1`,
      });

      return { success: `Deleted note ${id}` };
    } catch (error) {
      return { error: "Can't delete the note" };
    }
  });
