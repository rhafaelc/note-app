import { AddButton } from "~/components/note/add-button";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="mx-auto min-h-screen max-w-screen-2xl">
      <div>Hi</div>
      <AddButton session={session} />
    </main>
  );
}
