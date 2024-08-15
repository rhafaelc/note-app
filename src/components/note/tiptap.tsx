"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { useEffect, useState } from "react";
import { ToggleButtons } from "./toggle-buttons";
import Underline from "@tiptap/extension-underline";
import "~/styles/tiptap.css";

export function Tiptap(props: { onChange: (richText: string) => void }) {
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
    ],
    content: "",

    editorProps: {
      attributes: {
        class:
          "min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <>
      {editor && <ToggleButtons editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
}
