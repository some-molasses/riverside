import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { ItemTitle } from "../components/item-title";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience-section">
      <Heading2>Experience</Heading2>
      <div>
        <ExperienceItem
          name="Software Developer"
          team="Cards"
          date="Summer 2024"
          company="Wealthsimple"
        >
          <li>
            Played a key role in implementing a card rewards engine overhaul,{" "}
            <HL terms="backend">processing 80 000+ daily transactions</HL> and
            enabling features including{" "}
            <HL terms="backend">ATM reimbursements</HL>, cashback, and
            account-level rewards
          </li>
          <li>
            <HL terms="project">Independently architected and implemented</HL> a
            rewards summarization system, delivering real-time, dynamic product
            content in-app to overcome mobile app update challenges
          </li>
          <li>
            <HL terms="backend project">
              Oversaw the migration of 1000+ credit cards
            </HL>{" "}
            to a new engine while ensuring minimal user disruption
          </li>
          <li>
            Proactively addressed and resolved{" "}
            <HL terms="quality">cross-team concerns and system errors</HL>,
            reducing service failure resolution times
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Backend Engineer"
          team="Search"
          date="Winter 2024"
          company="Faire"
        >
          <li>
            <HL terms="backend">Implemented processes</HL> using{" "}
            <HL terms="database">DynamoDB</HL> and{" "}
            <HL terms="database">Redis</HL> to process up to{" "}
            <HL terms="database">
              1.8 M real-time search update records daily
            </HL>
          </li>
          <li>
            <HL terms="project">Led a full-stack initiative</HL> to split
            non-essential logic out of the search critical path, leading to a{" "}
            <HL terms="project">~8% improvement towards our target latency</HL>
          </li>
          <li>
            <HL terms="project backend">
              Investigated and implemented parallelization improvements
            </HL>{" "}
            across a complex, mature search infrastructure to achieve sufficient
            performance gains to offset high-latency changes elsewhere
          </li>
          <li>
            Implemented and monitored{" "}
            <HL terms="quality">metrics dashboards</HL> through{" "}
            <HL terms="quality">Datadog</HL> to ensure services operated at
            target levels
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Frontend Engineer"
          team="Emails"
          date="Winter 2023"
          company="Faire"
        >
          <li>
            <HL terms="project">Managed the implementation</HL> of experimental
            features, coordinating engineers and designers to achieve goals
          </li>
          <li>
            <HL terms="project">Independently scoped and implemented</HL>{" "}
            <HL terms="a11y">WCAG 2.1 accessibility features</HL>, drawing
            praise from external teams
          </li>
          <li>
            <HL terms="project">Outlined and implemented</HL> incident{" "}
            <HL terms="quality">post-mortem recommendations</HL>, improving{" "}
            engineering <HL terms="quality">quality</HL> practices to{" "}
            <HL terms="quality">prevent production failures</HL>
          </li>
          <li>
            Contributed to overhauling a mature{" "}
            <HL terms="react frontend">React</HL>-based web app to use modern
            React state management patterns with{" "}
            <HL terms="frontend quality">Jest</HL> unit testing and{" "}
            <HL terms="frontend quality">Cypress</HL> end-to-end testing.
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Software Developer"
          team="Web"
          date="Winter 2022"
          company="Vidyard"
        >
          <li>
            Led integration of <HL terms="frontend quality">Jest</HL>,{" "}
            <HL terms="frontend quality">ESLint</HL>, and{" "}
            <HL terms="frontend typescript">TypeScript</HL> with a mature
            codebase, starting the team&apos;s use of{" "}
            <HL terms="frontend quality">test-driven development</HL> with{" "}
            <HL terms="frontend quality">28% code coverage</HL> in two months to
            reduce and prevent user-facing errors.
          </li>
          <li>
            Performed and improved on a{" "}
            <HL terms="a11y">WCAG2.1 accessibility audit</HL> to decrease UX
            friction and <HL terms="a11y">increase conversion</HL>.
          </li>
          <li>
            Overhauled a <HL terms="php">PHP</HL> component library to implement{" "}
            <HL terms="php">object-oriented programming</HL> principles,
            decreasing ticket cycle time.
          </li>
          <li>
            <HL terms="project">Collaborated with external teams</HL> to clarify
            requirements and deliver progress updates.
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Software Developer"
          date="Summer 2021"
          company="Uptake Canada"
        >
          <li>
            Independently developed <HL terms="backend">NestJS RESTful API</HL>{" "}
            endpoints and complex <HL terms="database">SQL</HL> stored
            procedures to support frontend specifications
          </li>
          <li>
            Developed{" "}
            <HL terms="frontend javascript">new frontend interfaces</HL> using
            ExtJS to support design specifications and display API data.
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Web Developer"
          date="Summer 2020"
          company="Salus Global"
        >
          <li>
            <HL terms="frontend design">
              Designed and developed a mobile-friendly online eLearning platform
            </HL>{" "}
            for an international client with 2300+ total users, using{" "}
            <HL terms="frontend html">HTML</HL>,{" "}
            <HL terms="frontend css">CSS</HL>,{" "}
            <HL terms="frontend javascript">JavaScript</HL>, and an internal
            language.
          </li>
          <li>
            Entrusted with implementing <HL terms="frontend css">CSS</HL> with
            minimal HTML changes to render an existing platform with 2500+ users{" "}
            <HL terms="frontend css">mobile-aware</HL>
          </li>
          <li>
            Developed and implemented{" "}
            <HL terms="frontend javascript">JavaScript web components</HL> to{" "}
            <HL terms="frontend javascript">promote user engagement</HL> with
            educational materials
          </li>
          <li>
            <HL terms="project design">Led the visual design work</HL> for a
            mobile eLearning app deployed to 10 000+ users
          </li>
          <li>
            Edited supervisors&apos; external communications to ensure greater
            professionalism and impact in dealings with clients.
          </li>
        </ExperienceItem>
      </div>
    </section>
  );
};

const ExperienceItem: React.FC<{
  name: string;
  team?: string;
  date: string;
  company: string;
  children: React.ReactNode;
}> = ({ name, date, company, children }) => {
  return (
    <div className="experience-item">
      <div className="item-left">
        <div className="line-top"></div>
        <div className="line-item"></div>
        <div className="line-bottom"></div>
      </div>
      <div className="item-right">
        <ItemTitle title={name} bottomLeft={company} bottomRight={date} />
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
