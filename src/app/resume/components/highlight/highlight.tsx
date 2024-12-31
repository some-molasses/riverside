"use client";

import { Span } from "@/app/components/typography/variants/typography-variants";
import "./highlight.scss";

export const HL: React.FC<{ children: React.ReactNode; terms: string }> = ({
  children,
  terms,
}) => {
  const getClassList = (): string => {
    return `highlight ${terms
      .split(" ")
      .map((t) => `term-${t}`)
      .join(" ")}`;
  };

  const highlightLikeTerms = () => {
    const highlights = Array.from(document.getElementsByClassName("highlight"));

    for (const hl of highlights) {
      hl.classList.remove("active");
    }

    for (const term of terms.split(" ")) {
      const likeHighlights = Array.from(
        document.querySelectorAll(`.highlight.term-${term}`),
      );
      console.log(`.highlight.term-${term}`);

      for (const hl of likeHighlights) {
        hl.classList.add("active");
      }
    }
  };

  return (
    <span onClick={highlightLikeTerms}>
      <Span className={getClassList()}>{children}</Span>
    </span>
  );
};
