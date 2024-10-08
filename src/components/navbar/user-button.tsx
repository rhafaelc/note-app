import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ProfileAvatar } from "../profile-avatar";
import { SignOut } from "../signout-button";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { ThemeButton } from "./theme-button";

export async function UserButton(props: { email: string }) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, props.email),
  });
  if (!user) {
    return;
  }

  return (
    <div className="flex gap-12">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <ProfileAvatar image={user.image} name={user.name!} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ThemeButton />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
