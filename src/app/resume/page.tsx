import { Content } from "../components/content/content";
import { Footer } from "../components/footer/footer";
import { Page } from "../components/page/page";
import { Titles } from "../components/titles/titles";
import "./resume.scss";
import { EducationSection } from "./sections/education";
import { ExperienceSection } from "./sections/experience";
import { SkillsSection } from "./sections/skills";

export default function Resume() {
  return (
    <Page id="resume-page">
      <Content>
        <Titles
          title="cole stanley"
          subtitle="software developer / project lead"
        />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <Footer />
      </Content>
    </Page>
  );
}
