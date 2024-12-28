import {
  Heading2,
  Heading3,
  Span,
} from "@/app/components/typography/variants/typography-variants";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience-section">
      <Heading2>Experience</Heading2>
      <ExperienceItem
        name="Frontend Engineer"
        date="Winter 2023"
        company="Faire"
      >
        <li>
          Managed the implementation of experimental features, coordinating
          engineers and designers to achieve goals
        </li>
        <li>
          Independently scoped and implemented WCAG 2.1 accessibility features,
          drawing praise from external teams
        </li>
        <li>
          Outlined and implemented incident post-mortem recommendations,
          improving engineering quality practices to prevent production failures
        </li>
        <li>
          Contributed to overhauling a mature React-based web app to use modern
          React state management patterns with Jest unit testing and Cypress
          end-to-end testing.
        </li>
      </ExperienceItem>
    </section>
  );
};

const ExperienceItem: React.FC<{
  name: string;
  date: string;
  company: string;
  children: React.ReactNode;
}> = ({ name, date, company, children }) => {
  return (
    <div className="experience-item">
      <div className="titles">
        <div className="left">
          <Heading3>{name}</Heading3>
          <Span className="company" variant="regular-light">
            {company}
          </Span>
        </div>
        <div className="right">
          <Span>{date}</Span>
        </div>
      </div>
      <div className="description">
        <ul>{children}</ul>
      </div>
    </div>
  );
};
