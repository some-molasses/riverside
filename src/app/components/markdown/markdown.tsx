import { remark } from "remark";
import remarkHtml from "remark-html";

export const Markdown: React.FC<{ src?: string; contents?: string }> = async ({
  src,
  contents,
}) => {
  if (src && contents) {
    throw new Error(
      "only one of src or contents can be passed to Markdown component",
    );
  }

  const formatWriting = (text: string) => {
    return text
      .replaceAll(/-\/-/g, "<hr/>")
      .replaceAll(/❦/g, "<hr/>")
      .replaceAll(/\[([0-9]+)\]/g, (_, n) => `<sup>${n}</sup>`);
  };

  const result = formatWriting(
    (await remark().use(remarkHtml).process(contents)).toString(),
  );

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};
