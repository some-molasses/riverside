import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ServerSideMarkdown } from "@/app/components/markdown/server-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";

export default function OldPortfolio() {
  return (
    <PageContents id="old-portfolio-page">
      <Content>
        <Titles title={"Past portfolio"} />

        <ServerSideMarkdown src="public/works/gadgets/old-portfolio/description.md" />

        <Footer />
      </Content>
    </PageContents>
  );
}
