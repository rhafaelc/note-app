import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDistance, subDays } from "date-fns";

export function Note(props: {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="truncate">{props.title}</CardTitle>
        <CardDescription>
          {formatDistance(subDays(props.createdAt, 0), new Date())} ago
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div
          dangerouslySetInnerHTML={{ __html: props.description }}
          className="h-full max-h-56 flex-1 truncate"
        ></div>
      </CardContent>
      <CardFooter className="flex items-end justify-end">
        <Button asChild variant={"ghost"}>
          <Link href={`/note/${props.id}`}>
            <ExternalLink />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
