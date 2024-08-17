import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NoteDetails } from "~/components/note/note-details";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { noteId: string };
  searchParams: Record<string, string | string[] | undefined>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.noteId;

  const existingNote = await db.query.notes.findFirst({
    where: eq(notes.id, id),
  });

  if (!existingNote) {
    return {
      title: "Note - 404",
    };
  }

  return {
    title: `Note - ${existingNote.title}`,
  };
}

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
