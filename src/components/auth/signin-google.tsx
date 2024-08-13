import { signIn } from "~/server/auth";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export function SignIn() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button
        type="submit"
        className="flex w-full items-center gap-2"
        variant={"outline"}
      >
        Sign in with Google
        <FcGoogle />
      </Button>
    </form>
  );
}
