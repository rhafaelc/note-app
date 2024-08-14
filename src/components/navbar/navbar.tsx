import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "~/server/auth";
import { UserButton } from "./user-button";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-center sticky top-0 backdrop-filter backdrop-blur-lg">
      <ul className="flex max-w-screen-2xl flex-1 items-center justify-between px-8 py-4">
        <li className="text-lg font-bold">
          <Link href={"/"}>Note</Link>
        </li>
        <li>
          {session?.user ? (
            <UserButton email={session.user.email!} />
          ) : (
            <Button asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
