import { SearchRetrievalEngine } from "@/search-engine/search-retrieval-engine";
import { RetrievableItem } from "@/search-engine/types";
import Image from "next/image";
import Link from "next/link";
import { Content } from "../components/content/content";
import { Page } from "../components/page/page";
import {
  Heading1,
  Heading2,
  Paragraph,
  Span,
} from "../components/typography/variants/typography-variants";
import "./portfolio.scss";

export default async function Portfolio() {
  const items = await new SearchRetrievalEngine().retrieveAllItems();

  return (
    <Page id="portfolio-page">
      <Content>
        <div id="titles">
          <Heading1>project search</Heading1>
          <Span>a database of many things I have done</Span>
        </div>
        <div id="search-container">
          <input id="search" placeholder="search anything..."></input>
          <Span variant="regular-light">
            this search functionality implemented with no external libraries.
          </Span>
        </div>
        <hr id="top-divider" />
        <ul id="results">
          {items.map((item) => (
            <SearchResult
              key={item.location}
              item={item}
              snippet={item.description}
            />
          ))}
        </ul>
      </Content>
    </Page>
  );
}

const SearchResult: React.FC<{
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
          <Paragraph className="result-description">{snippet}</Paragraph>
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
