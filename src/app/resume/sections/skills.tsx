import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { Fragment } from "react";
import { HL } from "../components/highlight/highlight";

export const SkillsSection: React.FC = () => {
  const areas = {
    search: "search",
    payments: "payments",
    frontend: "frontend",
    backend: "backend",
    "project leadership": "project",
    quality: "quality a11y",
  };

  const languages = {
    TypeScript: "frontend",
    JavaScript: "frontend",
    SQL: "database",
    Kotlin: "backend",
    Ruby: "backend",
    "HTML/CSS": "frontend",
    PHP: "frontend",
    French: "French",
  };

  const joinItems = (items: Record<string, string>): React.ReactNode => {
    return Object.entries(items).map(([key, term], index) => (
      <Fragment key={key}>
        <Span className="skill">
          <HL terms={term}>{key}</HL>
        </Span>
        {index < Object.entries(items).length - 1 ? <Span> • </Span> : null}
      </Fragment>
    ));
  };

  return (
    <section id="skills-section">
      <Heading2>Strengths</Heading2>
      <div id="skills-body">
        <div>
          <Span>Key areas: </Span>
          {joinItems(areas)}
        </div>
        <div>
          <Span>Languages: </Span>
          {joinItems(languages)}
        </div>
      </div>
    </section>
  );
};
