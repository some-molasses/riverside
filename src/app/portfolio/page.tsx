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

export default function Portfolio() {
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
          <SearchResult
            name="The Last Rabbit"
            subtitle="writing"
            date={new Date(2024, 11)}
            snippet="The animals were leaving. None of the local housecats remember the time before. In the before, the valley was full of wild creatures. Raccoons, turtles, the heron, and most importantly, the rabbit. None remain. None of the others are the subject of stories, legends even, told at the housecats’ secret midnight meets."
          />
          <SearchResult
            name="The First Rabbit"
            subtitle="game"
            date={new Date(2023, 2)}
            snippet="did you ever hear the tragedy of darth plagueis the wise?"
          />
        </ul>
      </Content>
    </Page>
  );
}

const SearchResult: React.FC<{
  name: string;
  subtitle: string;
  date: Date;
  snippet: string;
}> = ({ name, subtitle, date, snippet }) => {
  return (
    <li className="search-result">
      <Link
        className="search-result-inner"
        href={`work/writing/${name.toLowerCase().replaceAll(` `, "-")}`}
      >
        <div className="result-text-panel">
          <Heading2 className="result-title">{name}</Heading2>
          <div className="result-subtitle-row">
            <Span className="result-subtitle">{subtitle}</Span>
            <Span className="result-date">
              {date.toLocaleDateString("en-CA", {
                month: "long",
                year: "numeric",
              })}
            </Span>
          </div>
          <Paragraph className="result-description">{snippet}</Paragraph>
        </div>
        <div className="result-image">
          <div
            style={{
              width: 150,
              height: 150,
              background: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            }}
          />
        </div>
      </Link>
    </li>
  );
};
