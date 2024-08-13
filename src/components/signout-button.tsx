import { signOut } from "~/server/auth";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="w-full">
        Sign Out
      </Button>
    </form>
  );
}
