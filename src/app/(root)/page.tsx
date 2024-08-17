import { AddButton } from "~/components/note/add-button";
import { MyNotes } from "~/components/note/my-notes";
import { auth } from "~/server/auth";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();

  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="mx-auto max-w-screen-2xl p-1">
      <MyNotes query={query} currentPage={currentPage} />
      <AddButton session={session} />
    </main>
  );
}
