import dynamic from "next/dynamic";
import { useCallback } from "react";

// The editor uses browser-specific APIs and must be loaded on the client side
const MdxEditor = dynamic(() => import("./MdxEditor"), { ssr: false });

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const handleChange = useCallback((v: string) => {
    onChange(v);
  }, [onChange]);

  return (
    <div className="admin-md-editor mdx-editor-container" style={{ minHeight: "420px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", padding: "16px" }}>
      <MdxEditor markdown={value} onChange={handleChange} />
    </div>
  );
}