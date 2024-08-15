"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { noteSchema } from "~/server/form/note-schema";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { noteAction } from "~/server/action/note-action";
import { toast } from "sonner";
import React from "react";

export function NoteForm(props: {
  userId: string;
  setOpen: React.Dispatch<boolean>;
}) {
  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      userId: props.userId,
    },
  });

  const { execute, status } = useAction(noteAction, {
    onExecute() {
      toast.loading("Creating a new note", {
        duration: Infinity,
      });
    },

    onSuccess(args) {
      toast.dismiss();
      if (args.data?.success) {
        toast.success(args.data.success, {
          duration: 1000,
        });
      }
      if (args.data?.error) {
        toast.error(args.data.error, {
          duration: 1000,
        });
      }
      props.setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof noteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your title"
                  {...field}
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormDescription>This is the title for the note.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your description"
                  {...field}
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormDescription>
                This is the description for the note.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === "executing"}>
          Create
        </Button>
      </form>
    </Form>
  );
}
