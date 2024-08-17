"use client";

import { type InferSelectModel } from "drizzle-orm";
import { type Session } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { type notes } from "~/server/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "../ui/button";
import { DetailsButtons } from "./details-buttons";
import { formatDistance, subDays } from "date-fns";

type Note = InferSelectModel<typeof notes>;


export function NoteDetails(props: {
  noteId: string;
  session: Session | null;
  isUserNote: boolean;
  existingNote: Note | undefined;
}) {
  if (!props.session) {
    toast.error("Please log in first.", { duration: 3000 });
    redirect("/");
  }
  if (!props.existingNote || !props.isUserNote) {
    toast.error(`Unable to load note ${props.noteId}`, { duration: 10000 });
    redirect("/");
  }
  const note = props.existingNote;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="overflow-x-auto">{note.title}</CardTitle>
        <CardDescription>
          {formatDistance(subDays(note.createdAt, 0), new Date())} ago
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <DetailsButtons note={note} />
        <div className="overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: note.description }}></div>
        </div>
      </CardContent>
    </Card>
  );
}
