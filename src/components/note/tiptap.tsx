"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { useEffect, useState } from "react";
import { ToggleButtons } from "./toggle-buttons";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import "~/styles/tiptap.css";
import { useFormContext } from "react-hook-form";

export function Tiptap(props: { disabled?: boolean; value?: string }) {
  const { setValue } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Your description",
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Underline,
      Highlight,
    ],
    content: props.value ?? "",

    editorProps: {
      attributes: {
        class:
          "min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      setValue("description", editor.getHTML(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    // editable: props.disabled,
    immediatelyRender: false,
  });

  return (
    <div className="relative flex flex-col gap-2">
      {editor && <ToggleButtons editor={editor} />}
      <div className="text-left">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
