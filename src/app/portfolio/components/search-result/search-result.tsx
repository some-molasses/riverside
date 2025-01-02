import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { RetrievableItem } from "@/search-engine/types";
import Image from "next/image";
import Link from "next/link";
import "./search-result.scss";

export const SearchResult: React.FC<{
  item: RetrievableItem;
  snippet: string | null;
}> = ({ item, snippet }) => {
  const { title, subtitle, date } = item.metadata;

  const getHref = () => {
    if (item.location.includes("writing-database")) {
      return `work/writing/${item.location
        .replace("writing-database", "")
        .replace("main.md", "")
        .replace("page.tsx", "")}`;
    } else {
      return item.location.replace("src\\app", "").replace("page.tsx", "");
    }
  };

  return (
    <li className="search-result">
      <Link className="search-result-inner" href={getHref()}>
        <div className="result-text-panel">
          {subtitle ? (
            <>
              <Heading2 className="result-title">{title}</Heading2>
              <div className="result-subtitle-row">
                <Span className="result-subtitle">{subtitle}</Span>
                <Span className="result-date">
                  {new Date(date).toLocaleDateString("en-CA", {
                    month: "long",
                    year: "numeric",
                  })}
                </Span>
              </div>
            </>
          ) : (
            <>
              <div className="result-subtitle-row">
                <Heading2 className="result-title">{title}</Heading2>
                <Span className="result-date">
                  {new Date(date).toLocaleDateString("en-CA", {
                    month: "long",
                    year: "numeric",
                  })}
                </Span>
              </div>
            </>
          )}
          <div className="result-description">
            <ClientSideMarkdown contents={snippet ?? undefined} />
          </div>
        </div>
        {item.metadata.thumbnail ? (
          <div className="result-image">
            <Image
              src={item.metadata.thumbnail.replace("public/", "/")}
              alt=""
              width={125}
              height={125}
            />
          </div>
        ) : null}
      </Link>
    </li>
  );
};
