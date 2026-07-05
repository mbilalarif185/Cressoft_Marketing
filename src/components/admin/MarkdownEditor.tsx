import dynamic from "next/dynamic";

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
      />
    </div>
  );
}