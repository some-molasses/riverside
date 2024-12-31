import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { ItemTitle } from "../components/item-title";

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects-section">
      <Heading2>Projects</Heading2>
      <div>
        <Project name="better-walks" date="2024">
          <li>
            Designed and developed a <HL terms="frontend">React Native</HL>{" "}
            mobile app to navigate users through real-world scavenger hunts
          </li>
          <li>
            Built a map node <HL terms="search backend">retrieval pipeline</HL>{" "}
            to identify, rank, process, and retrieve locations of interest
          </li>
          <li>
            Integrated OpenStreetMap datasets using the Overpass and
            OpenRouteService APIs to source{" "}
            <HL terms="backend gis">GIS data</HL>
          </li>
        </Project>
        <Project name="MathSoc Website" date="2024">
          <li>
            <HL terms="project">Led teams of software developers</HL> to
            redevelop the website of the University of Waterloo Undergraduate
            Society of Mathematics
          </li>
          <li>
            Used simple technologies including <HL terms="frontend">pug</HL> and
            JSON data storage to{" "}
            <HL terms="quality">ensure long-term maintainability</HL>
          </li>
          <li>
            Performed gradual deployment of new site to{" "}
            <HL terms="project">over 1000 semi-regular users</HL>.
          </li>
        </Project>
        <Project name="LATimes Search Engine" date="Fall 2024">
          <li>
            Developed an{" "}
            <HL terms="search">indexer, ranker, and query-based summarizer</HL>{" "}
            for a 131 000-document collection of LA Times news articles
          </li>
          <li>
            Implemented{" "}
            <HL terms="search">cosine similarity and BM25 retrieval</HL> methods
            with optional integration of Porter stemming
          </li>
          <li>
            Obtained a high grade in the associated University of Waterloo
            elective course for which this was an assignment, MSE 541
          </li>
        </Project>
      </div>
    </section>
  );
};

const Project: React.FC<{
  name: string;
  date: string;
  children: React.ReactNode;
}> = ({ name, date, children }) => {
  return (
    <div className="project-item">
      <div className="item-left">
        <div className="line-top"></div>
        <div className="line-item"></div>
        <div className="line-bottom"></div>
      </div>
      <div className="item-right">
        <ItemTitle title={name} topRight={date} />
        <div className="description">
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
};

const HL: React.FC<{ children: React.ReactNode; terms: string }> = ({
  children,
}) => {
  return <Span className="highlight">{children}</Span>;
};
