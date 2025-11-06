import { Heading2 } from "@/app/components/typography/variants/typography-variants";
import { HL } from "../components/highlight/highlight";
import { ItemTitle } from "../components/item-title/item-title";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience-section">
      <Heading2>Experience</Heading2>
      <div>
        <ExperienceItem
          name="Software Engineer"
          team="Forward-deployed engineering"
          date="Fall 2025"
          company="Ramp"
        >
          <li>
            <HL terms="project backend">
              Architected, coordinated, and implemented an integration
            </HL>{" "}
            with a key healthcare reporting & compliance partner, unlocking an
            estimated 20+ significant enterprise sales leads
          </li>
          <li>
            <HL terms="project frontend">Architected and implemented</HL> bulk
            expense attendee uploads, enabling over 5000 attendee uploads in a
            month and achieving table stakes for a key client to re-sign
          </li>
          <li>
            <HL terms="backend frontend">Implemented self-enroll onboarding</HL>{" "}
            for a new healthcare reporting feature, reducing friction and CX
            support requirements
          </li>
          <li>
            Recorded video communications to unveil and demonstrate new features
            for key enterprise clients
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Backend Engineer"
          team="Lake House"
          date="Summer 2025"
          company="Splunk"
        >
          <li>
            <HL terms="project">Independently overhauled</HL> a bespoke{" "}
            <HL terms="quality">testing framework</HL> to enable parallel code
            execution, leading to a 6.6x (or 51 minute) reduction in time to
            first failure
          </li>
          <li>
            Implemented{" "}
            <HL terms="backend">parallel log4j logger / appender apparatus</HL>{" "}
            to enable distinguishing concurrent log output, eliminating shared
            resources between previously-serial threads
          </li>
          <li>
            Added custom workarounds to{" "}
            <HL terms="backend">Amazon EMR Serverless</HL> instances to further
            enable log tracking
          </li>
          <li>
            Distributed approximately 300 food baskets weekly at food banks in
            San Francisco&apos;s SoMa and Mission districts
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Software Developer"
          team="Cards"
          date="Summer 2024"
          company="Wealthsimple"
        >
          <li>
            Played a key role in implementing a card rewards engine overhaul,{" "}
            <HL terms="backend payments">
              processing 80 000+ daily transactions
            </HL>{" "}
            and enabling features including{" "}
            <HL terms="backend payments">ATM reimbursements</HL>, cashback, and
            account-level rewards
          </li>
          <li>
            <HL terms="project payments">
              Independently architected and implemented
            </HL>{" "}
            a rewards summarization system, delivering real-time, dynamic
            product content in-app to overcome mobile app update challenges
          </li>
          <li>
            <HL terms="backend project payments">
              Oversaw the migration of 1000+ credit cards
            </HL>{" "}
            to a new engine while ensuring minimal user disruption
          </li>
          <li>
            Proactively addressed and resolved{" "}
            <HL terms="quality payments">
              cross-team concerns and system errors
            </HL>
            , reducing service failure resolution times
          </li>
        </ExperienceItem>
        <ExperienceItem
          name="Backend Engineer"
          team="Search"
          date="Winter 2024"
          company="Faire"
        >
          <li>
            <HL terms="backend search">Implemented processes</HL> using{" "}
            <HL terms="database search">DynamoDB</HL> and{" "}
            <HL terms="database search">Redis</HL> to process up to{" "}
            <HL terms="database search">
              1.8 M real-time search update records daily
            </HL>
          </li>
          <li>
            <HL terms="project search">Led a full-stack initiative</HL> to split
            non-essential logic out of the search critical path, leading to a{" "}
            <HL terms="project search">
              ~8% improvement towards our target latency
            </HL>
          </li>
          <li>
            <HL terms="project backend search">
              Investigated and implemented parallelization improvements
            </HL>{" "}
            across a complex, mature search infrastructure to achieve sufficient
            performance gains to offset high-latency changes elsewhere
          </li>
          <li>
            Implemented and monitored{" "}
            <HL terms="quality search">metrics dashboards</HL> through{" "}
            <HL terms="quality search">Datadog</HL> to ensure services operated
            at target levels
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
            Overhauled a <HL terms="php frontend">PHP</HL> component library to
            implement <HL terms="php frontend">object-oriented programming</HL>{" "}
            principles, decreasing ticket cycle time.
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
}> = ({ name, team, date, company, children }) => {
  return (
    <div className="experience-item">
      <div className="item-left">
        <div className="line-top"></div>
        <div className="line-item"></div>
        <div className="line-bottom"></div>
      </div>
      <div className="item-right">
        <ItemTitle
          title={name}
          bottomLeft={[company, team].filter(Boolean).join(" | ")}
          bottomRight={date}
        />
        <div className="description">
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
};
