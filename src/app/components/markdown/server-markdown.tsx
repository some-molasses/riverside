import { readFile } from "fs/promises";
import { MarkdownFormatter } from "./markdown-formatter";
import "./markdown.scss";

export const ServerSideMarkdown: React.FC<{
  contents?: string;
  src?: string;
}> = async ({ contents, src }) => {
  if (src && contents) {
    throw new Error("Can only use one of src or contents, found both");
  }

  if (src) {
    contents = await readFile(src).then((s) => s.toString());
  }

  const result = contents ? await MarkdownFormatter.process(contents) : "";

  return (
    <div
      className="markdown-section"
      dangerouslySetInnerHTML={{ __html: result }}
    ></div>
  );
};
