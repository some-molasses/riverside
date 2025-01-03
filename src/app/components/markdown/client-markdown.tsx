"use client";

import { useEffect, useState } from "react";
import { MarkdownFormatter } from "./markdown-formatter";

export const ClientSideMarkdown: React.FC<{
  contents?: string;
}> = ({ contents }) => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (contents) {
      MarkdownFormatter.process(contents).then((output) => setResult(output));
    }
  }, [contents]);

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};
