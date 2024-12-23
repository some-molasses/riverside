import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";

export default async function Luigi() {
  return (
    <Page id="luigi-page">
      <Content>
        <Titles title={"Mario 1-1"} />
        <Footer />
      </Content>
    </Page>
  );
}
