import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { WritingIndexer } from "../../../../../writing-database/indexer";
import "./writing.scss";

export default async function WritingWork({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const work = await WritingIndexer.getWriting(slug.join("/"));

  const formatWriting = (text: string) => {
    return text.replaceAll(/-\/-/g, "<hr/>");
  };

  if (work === null) {
    return null;
  }

  const { title, subtitle, body } = work;

  const result = formatWriting(
    (await remark().use(remarkHtml).process(body)).toString(),
  );

  return (
    <Page id="writing-work-page">
      <Content>
        <Titles title={title} subtitle={subtitle} />
        <div
          id="writing-work-body"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div>
        <Footer />
      </Content>
    </Page>
  );
}
