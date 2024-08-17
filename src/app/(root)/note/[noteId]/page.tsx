import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NoteDetails } from "~/components/note/note-details";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export default async function NoteDetailsPage({
  params,
}: {
  params: { noteId: string };
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const existingNote = await db.query.notes.findFirst({
    where: eq(notes.id, params.noteId),
  });
  const isUserNote = existingNote?.userId === session.user?.id;

  return (
    <main className="mx-auto max-w-screen-2xl p-1">
      <NoteDetails
        noteId={params.noteId}
        session={session}
        isUserNote={isUserNote}
        existingNote={existingNote}
      />
    </main>
  );
}
