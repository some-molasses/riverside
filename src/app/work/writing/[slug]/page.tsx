import { Content } from "@/app/components/content/content";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";
// import markdownit from "markdown-it";
import { Footer } from "@/app/components/footer/footer";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { WritingIndexer } from "../../../../../writing-database/indexer";
import "./writing.scss";

export default async function WritingWork({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const work = await WritingIndexer.getWriting(
    `mathnews/v156/i6/the-last-rabbit`,
  );

  if (work === null) {
    return null;
  }

  const { title, subtitle, date, body } = work;

  // const md = markdownit({
  //   breaks: false,
  //   // typographer: true,
  // });

  // const html = md.render("test");
  // const html = md.render(body);
  const result = (await remark().use(remarkHtml).process(body)).toString();
  // const result = body;

  console.log(result);

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
