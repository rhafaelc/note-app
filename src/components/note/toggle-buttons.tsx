import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  StrikethroughIcon,
  Underline,
} from "lucide-react";

export function ToggleButtons(props: { editor: Editor }) {
  return (
    <div className="felx-col flex gap-2">
      <Toggle
        pressed={props.editor.isActive("bold")}
        onPressedChange={() => props.editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("underline")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleUnderline().run()
        }
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("italic")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("strike")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleStrike().run()
        }
        size={"sm"}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("orderedList")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleOrderedList().run()
        }
        size={"sm"}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("bulletList")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleBulletList().run()
        }
        size={"sm"}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={props.editor.isActive("highlight")}
        onPressedChange={() =>
          props.editor.chain().focus().toggleHighlight().run()
        }
        size={"sm"}
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
