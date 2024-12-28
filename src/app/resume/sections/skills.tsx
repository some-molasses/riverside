import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { Fragment } from "react";

export const SkillsSection: React.FC = () => {
  const areas = [
    "search",
    "payments",
    "frontend",
    "backend",
    "project leadership",
    "quality",
  ];

  const languages = [
    "TypeScript",
    "JavaScript",
    "SQL",
    "Kotlin",
    "Ruby",
    "HTML/CSS",
    "PHP",
    "French",
  ];

  const joinItems = (items: string[]): React.ReactNode => {
    return items.map((item, index) => (
      <Fragment key={item}>
        <Span className="skill">{item}</Span>
        {index < items.length - 1 ? <Span> • </Span> : null}
      </Fragment>
    ));
  };

  return (
    <section id="skills-section">
      <Heading2>Strengths</Heading2>
      <div>
        <Span>Key areas: </Span>
        {joinItems(areas)}
      </div>
      <div>
        <Span>Languages: </Span>
        {joinItems(languages)}
      </div>
    </section>
  );
};
