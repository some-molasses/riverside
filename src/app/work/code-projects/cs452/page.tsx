import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ServerSideMarkdown } from "@/app/components/markdown/server-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";

export default function CS452() {
  return (
    <PageContents id="cs452-search-page">
      <Content>
        <Titles title={"Real-time operating system"} />

        <ServerSideMarkdown src="src/app/work/code-projects/cs452/description.md" />

        <Footer />
      </Content>
    </PageContents>
  );
}
