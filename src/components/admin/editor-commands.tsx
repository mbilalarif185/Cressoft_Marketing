import type {
  ExecuteState,
  ICommand,
  TextAreaTextApi,
} from "@uiw/react-md-editor/commands";
import {
  bold,
  checkedListCommand,
  code,
  codeBlock,
  codeEdit,
  codeLive,
  codePreview,
  divider,
  fullscreen,
  heading1,
  heading2,
  heading3,
  heading4,
  help,
  hr,
  image,
  italic,
  link,
  orderedListCommand,
  quote,
  strikethrough,
  table,
  unorderedListCommand,
} from "@uiw/react-md-editor/commands";

function toolbarLabel(text: string) {
  return <span className="admin-md-editor__label">{text}</span>;
}

function selectLine(text: string, selection: { start: number; end: number }) {
  const start = text.slice(0, selection.start).lastIndexOf("\n") + 1;
  let end = text.slice(selection.end).indexOf("\n") + selection.end;
  if (end === selection.end - 1) end = text.length;
  return { start, end };
}

const paragraph: ICommand = {
  name: "paragraph",
  keyCommand: "paragraph",
  buttonProps: { "aria-label": "Paragraph", title: "Paragraph" },
  icon: toolbarLabel("P"),
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const range = selectLine(state.text, state.selection);
    const lineState = api.setSelectionRange(range);
    const plain = lineState.selectedText.replace(/^#{1,6}\s+/, "");
    api.replaceSelection(plain);
  },
};

function withLabel(command: ICommand, label: string, title: string): ICommand {
  return {
    ...command,
    icon: toolbarLabel(label),
    buttonProps: {
      ...command.buttonProps,
      "aria-label": title,
      title,
    },
  };
}

const headingToolbar = [
  withLabel(heading1, "H1", "Heading 1"),
  withLabel(heading2, "H2", "Heading 2"),
  withLabel(heading3, "H3", "Heading 3"),
  withLabel(heading4, "H4", "Heading 4"),
  paragraph,
];

/** Toolbar with explicit heading + paragraph controls (not hidden in a dropdown). */
export const blogEditorCommands: ICommand[] = [
  bold,
  italic,
  strikethrough,
  divider,
  ...headingToolbar,
  divider,
  hr,
  link,
  quote,
  code,
  codeBlock,
  image,
  table,
  divider,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  divider,
  help,
];

export const blogEditorExtraCommands: ICommand[] = [
  codeEdit,
  codeLive,
  codePreview,
  divider,
  fullscreen,
];