import { Content } from "@/app/components/content/content";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";

export default async function WritingWork({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Page id="writing-work-page">
      <Content>
        <Titles title={`titulo ${slug}`} subtitle="subtitulo" />
      </Content>
    </Page>
  );
}
