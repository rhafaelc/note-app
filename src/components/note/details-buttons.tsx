"use client";

import { type InferSelectModel } from "drizzle-orm";
import { type notes } from "~/server/db/schema";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { NoteForm } from "./note-form";

export function DetailsButtons(props: {
  note: InferSelectModel<typeof notes>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 py-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Edit</Button>
        </DialogTrigger>

        <DialogContent className="max-h-screen overflow-y-auto overflow-x-hidden">
          <DialogHeader className="overflow-x-auto">
            <DialogTitle>Edit note</DialogTitle>
            <DialogDescription className="">
              Edit the current note. Make changes to the note&apos;s details and
              save them.
            </DialogDescription>
            <div className="w-full">
              <NoteForm
                userId={props.note.userId}
                setOpen={setOpen}
                description={props.note.description}
                id={props.note.id}
                title={props.note.title}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button variant={"destructive"}>Delete</Button>
    </div>
  );
}
