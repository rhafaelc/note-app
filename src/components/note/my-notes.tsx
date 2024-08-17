import { auth } from "~/server/auth";
import { Note } from "./note";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { notes } from "~/server/db/schema";

export async function MyNotes() {
  const session = await auth();

  if (!session?.user?.id) {
    return <h1>Please log in.</h1>;
  }

  const myNotes = await db.query.notes.findMany({
    where: eq(notes.userId, session.user.id),
  });

  return (
    <section className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
      {myNotes.map((myNote) => (
        <Note
          key={myNote.id}
          id={myNote.id}
          title={myNote.title}
          description={myNote.description}
          userId={myNote.userId}
          createdAt={myNote.createdAt}
        />
      ))}
    </section>
  );
}
