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
import { useAction } from "next-safe-action/hooks";
import { deleteAction } from "~/server/action/delete-action";
import { toast } from "sonner";
import {  useRouter } from "next/navigation";

export function DetailsButtons(props: {
  note: InferSelectModel<typeof notes>;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { execute, status } = useAction(deleteAction, {
    onExecute() {
      toast.loading("Deleting the note", {
        duration: Infinity,
      });
    },

    onSuccess(args) {
      toast.dismiss();
      if (args.data?.success) {
        toast.success(args.data.success, {
          duration: 1000,
        });
        router.push("/");
      }
      if (args.data?.error) {
        toast.error(args.data.error, {
          duration: 1000,
        });
      }
    },
  });

  return (
    <div className="flex gap-2 py-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} disabled={status === "executing"}>
            Edit
          </Button>
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

      <Button
        variant={"destructive"}
        disabled={status === "executing"}
        onClick={() => {
          execute({ id: props.note.id });
        }}
      >
        Delete
      </Button>
    </div>
  );
}
