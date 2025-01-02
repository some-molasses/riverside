"use client";

import { useEffect, useState } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";

export const ClientSideMarkdown: React.FC<{
  contents?: string;
}> = ({ contents }) => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    remark()
      .use(remarkHtml)
      .process(contents)
      .then((markdown) => {
        setResult(formatWriting(markdown.toString()));
      });
  }, [contents]);

  const formatWriting = (text: string) => {
    return text
      .replaceAll(/-\/-/g, "<hr/>")
      .replaceAll(/❦/g, "<hr/>")
      .replaceAll(/\[([0-9]+)\]/g, (_, n) => `<sup>${n}</sup>`)
      .replace(
        /--postscript--(.*)/s,
        (_, ps) => `<div class="postscript">${ps}</div>`,
      )
      .replaceAll(
        /\[caption\]\(([^\)]+)\)/gs,
        (_, caption) => `<div class="caption">${caption}</div>`,
      );
  };

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};
