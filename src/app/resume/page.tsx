import { Content } from "../components/content/content";
import { Footer } from "../components/footer/footer";
import { PageContents } from "../components/page-contents/page-contents";
import { Titles } from "../components/titles/titles";
import "./resume.scss";
import { EducationSection } from "./sections/education";
import { ExperienceSection } from "./sections/experience";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";

export default function Resume() {
  return (
    <PageContents id="resume-page">
      <Content>
        <Titles
          title="river stanley"
          subtitle="software developer / project lead"
        />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <Footer />
      </Content>
    </PageContents>
  );
}
