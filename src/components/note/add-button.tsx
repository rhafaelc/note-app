"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { NoteForm } from "./note-form";
import { type Session } from "next-auth";
import { useState } from "react";

export function AddButton(props: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  if (!props.session) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className="fixed bottom-3 ml-3 rounded-full px-2 py-2"
            >
              <DialogTrigger>
                <Plus />
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create a new note</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-h-screen overflow-y-auto overflow-x-hidden">
        <DialogHeader className="overflow-x-auto">
          <DialogTitle>Add a new note</DialogTitle>
          <DialogDescription className="">
            Add a new note to your collection. Once added, you can view, edit,
            or delete the note&apos;s details.
          </DialogDescription>
          <div className="w-full">
            <NoteForm userId={props.session.user!.id!} setOpen={setOpen} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
