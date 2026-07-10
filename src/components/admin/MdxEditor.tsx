import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  UndoRedo,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  StrikeThroughSupSubToggles,
  CodeToggle,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  Separator,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';

interface MdxEditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
}

/**
 * Uploads pasted/dropped/picked images through the same endpoint the
 * featured-image fields use (raw body + Content-Type header, `{ ok, url }`).
 */
async function imageUploadHandler(file: File): Promise<string> {
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.message ?? "Image upload failed.");
  }
  return data.url as string;
}

// Languages offered in the code-block dropdown. Keys must cover every fence
// language used in existing posts, or the editor refuses to open them.
const codeBlockLanguages = {
  "": "Plain text",
  txt: "Plain text",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  bash: "Bash",
  sh: "Shell",
  sql: "SQL",
  python: "Python",
  php: "PHP",
  yaml: "YAML",
  md: "Markdown",
};

export default function MdxEditor({ markdown, onChange }: MdxEditorProps) {
  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      contentEditableClassName="admin-mdx-content"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        codeMirrorPlugin({ codeBlockLanguages }),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <DiffSourceToggleWrapper>
                      <UndoRedo />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <StrikeThroughSupSubToggles />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                      <InsertImage />
                      <InsertTable />
                      <InsertThematicBreak />
                      <InsertCodeBlock />
                    </DiffSourceToggleWrapper>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  );
}
