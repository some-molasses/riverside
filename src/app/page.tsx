import Image from "next/image";
import Link from "next/link";
import { Content } from "./components/content/content";
import { Page } from "./components/page/page";
import {
  Heading1,
  Heading2,
  Paragraph,
  Span,
} from "./components/typography/variants/typography-variants";
import "./home.scss";

export default function Home() {
  return (
    <Page id="homepage">
      <div className="img-container">
        <Image src="/fall/october.jpg" alt="" fill />
      </div>
      <Content>
        <div id="titles">
          <Heading1>river stanley</Heading1>
          <Span>software developer, writer, occasional leader</Span>
        </div>
        {/* @todo add links to all sections */}
        <SoftwareSection />
        <hr />
        <WritingSection />
        <hr />
        <LeaderSection />
      </Content>
    </Page>
  );
}

const SoftwareSection: React.FC<{}> = ({}) => {
  return (
    <section className="homepage-section">
      <Heading2>software developer</Heading2>
      <Paragraph>
        fifth-year double degree computer science and business student at the{" "}
        <Highlight>University of Waterloo</Highlight> and{" "}
        <Highlight>Wilfrid Laurier University</Highlight>
      </Paragraph>
      <ul className="homepage-list">
        <HomepageListItem>
          speciality areas: search, payments, GIS, frontend
        </HomepageListItem>
        <HomepageListItem>
          website redevelopment team lead across two years for the Mathematics
          Society of the University of Waterloo{" "}
        </HomepageListItem>
        <HomepageListItem>
          projects: better-walks, mathsoc-website, a plethora of javascript
          gadgets
        </HomepageListItem>
      </ul>
      <Paragraph>
        <Link href="/resume">see my full resume.</Link>
      </Paragraph>
    </section>
  );
};

const WritingSection: React.FC<{}> = ({}) => {
  return (
    <section className="homepage-section">
      <Heading2>writer</Heading2>
      <Paragraph>
        creator of silly little writings for a world in need
      </Paragraph>
      <ul className="homepage-list">
        <HomepageListItem>
          <Link href="/portfolio?filter=short-story">short story author</Link>
        </HomepageListItem>
        <HomepageListItem>
          <Link href="/portfolio?filter=poem">occasional poet</Link>
        </HomepageListItem>
        <HomepageListItem>
          <Link href="https://www.google.com/search?q=university+of+waterloo+vending+machines+facial+recognition">
            accidental international M&M&apos;s journalist
          </Link>
        </HomepageListItem>
      </ul>
      <Paragraph>
        <Link href="/portfolio?filter=writing">see my written works.</Link>
      </Paragraph>
    </section>
  );
};

const LeaderSection: React.FC<{}> = ({}) => {
  return (
    <section className="homepage-section">
      <Heading2>ocassional leader</Heading2>
      <Paragraph>
        creator of silly little writings for a world in need
      </Paragraph>
      <ul className="homepage-list">
        <HomepageListItem>
          math<b>NEWS</b> editor
        </HomepageListItem>
        <HomepageListItem>
          board member of the Mathematics Society of the University of Waterloo
        </HomepageListItem>
        <HomepageListItem>
          campus ambassador for the University of Waterloo Faculty of
          Mathematics
        </HomepageListItem>
      </ul>
      <Paragraph>
        <Link href="mailto:river.stanley@uwaterloo.ca">reach out.</Link>
      </Paragraph>
    </section>
  );
};

const HomepageListItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <li>
      <div className="marker">
        <div className="marker-inner">›</div>
      </div>
      <div style={{ height: "100%" }}>
        <Span>{children}</Span>
      </div>
    </li>
  );
};

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-highlight">{children}</span>
);
