import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ServerSideMarkdown } from "@/app/components/markdown/server-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import { SearchRetriever } from "@/search-engine/search-retriever";
import "./writing.scss";

export default async function WritingWork({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const work = await new SearchRetriever().retrieveItem(
    "writing-database/" + slug.join("/"),
  );

  if (work === null) {
    return null;
  }

  const { title, subtitle, tags } = work;

  return (
    <PageContents id="writing-work-page">
      <Content>
        <Titles title={title} subtitle={subtitle} />
        <div id="writing-work-body" className={tags.join(" ")}>
          <ServerSideMarkdown contents={await work.getTextBody()} />
        </div>
        <Footer />
      </Content>
    </PageContents>
  );
}
