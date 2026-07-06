import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, type ClipboardEvent } from "react";

import {
  blogEditorCommands,
  blogEditorExtraCommands,
} from "@/components/admin/editor-commands";

// The editor's own CSS is imported globally in `_app.tsx` — the Pages Router
// only allows non-module (global) CSS imports there, not inside components.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const pendingCaret = useRef<number | null>(null);

  // `@uiw/react-md-editor` is fully controlled: it re-syncs the textarea from the
  // `value` prop on every render. On paste that re-sync leaves the caret at the
  // paste origin instead of after the inserted text, so the next keystroke lands
  // in the wrong place. After the pasted value is committed, put the caret back
  // at the end of what we inserted.
  useEffect(() => {
    if (pendingCaret.current == null) return;
    const el = textareaRef.current;
    if (el) {
      const pos = pendingCaret.current;
      el.setSelectionRange(pos, pos);
    }
    pendingCaret.current = null;
  }, [value]);

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLTextAreaElement>) => {
      // A <textarea> only holds plain text, so plain text is exactly what the
      // browser would have inserted natively — we just do it ourselves so we can
      // control the caret afterwards.
      const pasted = event.clipboardData.getData("text/plain");
      if (!pasted) return;

      const el = event.currentTarget;
      event.preventDefault();
      textareaRef.current = el;

      const start = el.selectionStart ?? value.length;
      const end = el.selectionEnd ?? start;
      pendingCaret.current = start + pasted.length;
      onChange(value.slice(0, start) + pasted + value.slice(end));
    },
    [value, onChange],
  );

  return (
    <div data-color-mode="light" className="admin-md-editor">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={420}
        preview="live"
        visibleDragbar={false}
        commands={blogEditorCommands}
        extraCommands={blogEditorExtraCommands}
        textareaProps={{ onPaste: handlePaste }}
      />
    </div>
  );
}