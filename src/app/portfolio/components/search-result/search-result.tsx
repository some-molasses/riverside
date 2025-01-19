import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { QueryResult } from "@/app/search-engine/engines/shared/query-result";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./search-result.scss";

export const SearchResult: React.FC<{
  item: QueryResult;
}> = ({ item }) => {
  const { title, subtitle, date } = item.metadata;

  const getHref = () => {
    if (item.metadata.location.includes("writing-database")) {
      return `work/writing/${item.metadata.location
        .replace("writing-database", "")
        .replace("main.md", "")
        .replace("page.tsx", "")}`;
    } else {
      return item.metadata.location
        .replace("src\\app", "")
        .replace("page.tsx", "");
    }
  };

  return (
    <li className="search-result">
      <Link className="search-result-inner" href={getHref()}>
        <div className="result-text-panel">
          <Heading2 className="result-title">{title}</Heading2>
          <div className="result-subtitle-row">
            {subtitle ? (
              <>
                <Span className="result-subtitle">{subtitle}</Span>
                <Span className="result-date">
                  {new Date(date).toLocaleDateString("en-CA", {
                    month: "long",
                    year: "numeric",
                  })}
                </Span>
              </>
            ) : (
              <>
                <Span className="result-date">
                  {new Date(date).toLocaleDateString("en-CA", {
                    month: "long",
                    year: "numeric",
                  })}
                </Span>
              </>
            )}
          </div>
          <div className="result-description">
            <div
              dangerouslySetInnerHTML={{
                __html: item.description ?? undefined,
              }}
            />
          </div>
          <div className="bottom-row">
            <div className="result-tags">
              {item.metadata.tags.sort().map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        {item.metadata.thumbnail ? (
          <div className="result-image">
            <Image
              src={item.metadata.thumbnail.replace("public/", "/")}
              alt=""
              fill
            />
          </div>
        ) : null}
      </Link>
    </li>
  );
};

const TagPill: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <Link className="result-tag" href={`/portfolio?filter=${tag}`}>
      {tag}
    </Link>
  );
};
