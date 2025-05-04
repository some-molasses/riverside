import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ServerSideMarkdown } from "@/app/components/markdown/server-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";

export default function MNSearch() {
  return (
    <PageContents id="mathnews-search-page">
      <Content>
        <Titles title={"mathNEWS Search Engine"} />

        <ServerSideMarkdown src="src/app/work/code-projects/mathnews-search/description.md" />

        <Footer />
      </Content>
    </PageContents>
  );
}
