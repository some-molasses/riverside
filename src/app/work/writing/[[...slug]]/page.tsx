import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ServerSideMarkdown } from "@/app/components/markdown/server-markdown";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";
import { SearchRetrievalEngine } from "@/search-engine/search-retrieval-engine";
import "./writing.scss";

export default async function WritingWork({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const work = await new SearchRetrievalEngine().getItem(
    "writing-database/" + slug.join("/"),
  );

  if (work === null) {
    return null;
  }

  const { title, subtitle, body } = work;

  return (
    <Page id="writing-work-page">
      <Content>
        <Titles title={title} subtitle={subtitle} />
        <div id="writing-work-body">
          <ServerSideMarkdown contents={body} />
        </div>
        <Footer />
      </Content>
    </Page>
  );
}
