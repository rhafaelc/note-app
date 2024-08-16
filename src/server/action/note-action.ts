"use server";

import { actionClient } from "~/lib/safe-action";
import { noteSchema } from "../form/note-schema";
import { db } from "../db";
import { notes } from "../db/schema";
import { revalidatePath } from "next/cache";

export const noteAction = actionClient
  .schema(noteSchema)
  .action(async ({ parsedInput: { id, userId, description, title } }) => {
    if (!id) {
      // new note
      try {
        const newNote = await db
          .insert(notes)
          .values({
            title,
            description,
            userId,
          })
          .returning();
        if (!newNote[0]) {
          return { error: "Can't create a new note" };
        }
        revalidatePath("/");
        return { success: `Created a note with title ${newNote[0].title}` };
      } catch (error) {
        return { error: "Can't create a new note" };
      }
    }

    if (id) {
      //edit
    }
  });
