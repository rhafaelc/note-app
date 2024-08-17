import { AddButton } from "~/components/note/add-button";
import { MyNotes } from "~/components/note/my-notes";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-screen-2xl">
      <MyNotes />
      <AddButton session={session} />
    </main>
  );
}
