"use server";

import { actionClient } from "~/lib/safe-action";
import { noteSchema } from "../form/note-schema";
import { db } from "../db";
import { notes, users } from "../db/schema";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";

export const noteAction = actionClient
  .schema(noteSchema)
  .action(async ({ parsedInput: { id, userId, description, title } }) => {
    if (!id) {
      // new note
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.id, userId),
        });
        if (user?.noteLimit! <= 0) {
          return { error: "Note quota reached" };
        }

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
        await db
          .update(users)
          .set({
            noteLimit: sql`${users.noteLimit} - 1`,
          })
          .where(eq(users.id, newNote[0].userId));
        revalidatePath("/");
        return { success: `Created a note with title ${newNote[0].title}` };
      } catch (error) {
        return { error: "Can't create a new note" };
      }
    }

    if (id) {
      //edit
      try {
        const editNode = await db
          .update(notes)
          .set({
            createdAt: new Date(),
            description,
            title,
          })
          .where(eq(notes.id, id))
          .returning();
        if (!editNode[0]) {
          return { error: "Can't edit the note" };
        }
        revalidatePath("/");
        revalidatePath(`/note/${id}`);
        return { success: `Edited a note with title ${editNode[0].title}` };
      } catch (error) {
        return { error: "Can't edit the note" };
      }
    }
  });
