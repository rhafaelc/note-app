import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SignIn } from "./signin-google";
import { Separator } from "~/components/ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";

export function AuthCard(props: {
  title: string;
  description: string;
  type: "login" | "register";
  backURL: string;
  backMessage: string;
}) {
  return (
    <Card className="w-96 max-sm:w-10/12">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.type == "login" && "Hi"}
        {props.type == "register" && "Hi"}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <SignIn />
        <Button asChild variant={'link'} className="text-xs">
          <Link href={props.backURL}>{props.backMessage}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
