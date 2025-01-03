import { MarkdownFormatter } from "./markdown-formatter";

export const ServerSideMarkdown: React.FC<{
  contents?: string;
}> = async ({ contents }) => {
  const result = contents ? await MarkdownFormatter.process(contents) : "";

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};
