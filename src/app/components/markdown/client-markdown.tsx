"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { MarkdownFormatter } from "./markdown-formatter";
import "./markdown.scss";

export const ClientSideMarkdown: React.FC<{
  contents?: string;
  src?: string;
}> = ({ contents, src }) => {
  if (src && contents) {
    throw new Error("Can only use one of src or contents, found both");
  }

  const fetcher = useCallback(
    async (url: string) => {
      if (src) {
        const res = await fetch(url);
        return res.text();
      }
    },
    [src],
  );

  const { data, isLoading } = useSWR(src, fetcher);

  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (contents) {
      MarkdownFormatter.process(contents).then((output) => setResult(output));
    }
  }, [contents]);

  useEffect(() => {
    if (src && !isLoading && data) {
      MarkdownFormatter.process(data).then((output) => setResult(output));
    }
  }, [src, data, isLoading]);

  return (
    <div
      className="markdown-section"
      dangerouslySetInnerHTML={{ __html: result }}
    ></div>
  );
};
