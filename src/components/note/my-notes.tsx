import { auth } from "~/server/auth";
import { Note } from "./note";
import { db } from "~/server/db";
import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { notes } from "~/server/db/schema";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Notebook } from "lucide-react";
import SearchNote from "./search-note";
import NotePagination from "./note-pagination";

export async function MyNotes(props: { query: string; currentPage: number }) {
  const session = await auth();
  if (!session?.user?.id) {
    return <h1>Please log in.</h1>;
  }

  const myNotes = await db.query.notes.findMany({
    where: eq(notes.userId, session.user.id),
    orderBy: desc(notes.createdAt),
  });

  if (myNotes.length === 0) {
    return (
      <Alert>
        <Notebook className="h-4 w-4" />
        <AlertTitle>You don&apos;t have any notes</AlertTitle>
        <AlertDescription>
          You can add a new note by clicking the plus button.
        </AlertDescription>
      </Alert>
    );
  }

  function filterNote(
    myNotes: InferSelectModel<typeof notes>[],
    itemsPerPage: number,
    query: string,
    currentPage: number,
  ) {
    const filteredNotes = myNotes.filter((note) => {
      const matchesQuery =
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase());

      return matchesQuery;
    });

    return filteredNotes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }

  function getTotalPages(
    myNotes: InferSelectModel<typeof notes>[],
    itemsPerPage: number,
    query: string,
  ): number {
    const filteredNotes = myNotes.filter((note) => {
      const matchesQuery =
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase());

      return matchesQuery;
    });

    return Math.ceil(filteredNotes.length / itemsPerPage);
  }

  const filteredNote = filterNote(myNotes, 12, props.query, props.currentPage);
  const totalPages = getTotalPages(myNotes, 12, props.query);

  return (
    <div className="flex flex-col gap-2 p-2">
      <SearchNote placeholder="Search note..." />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredNote.length <= 0 ? (
          <div>No notes were found</div>
        ) : (
          filteredNote.map((myNote) => (
            <Note
              key={myNote.id}
              id={myNote.id}
              title={myNote.title}
              description={myNote.description}
              userId={myNote.userId}
              createdAt={myNote.createdAt}
            />
          ))
        )}
      </section>
      {filteredNote.length > 0 && (
        <div className="mt-5 flex w-full justify-center">
          <NotePagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
