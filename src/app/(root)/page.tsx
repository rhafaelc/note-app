import { AddButton } from "~/components/note/add-button";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="mx-auto min-h-screen max-w-screen-2xl">
      <div>Hi</div>
      <AddButton session={session} />
      <div className="h-64 w-full overflow-hidden bg-red-400">
        <div className="h-full w-[1500px] overflow-auto bg-blue-600">
          <div className="h-[200px] w-full bg-green-600">Content goes here</div>
          <div className="h-[200px] w-full bg-yellow-600">More content</div>
        </div>
      </div>
    </main>
  );
}
