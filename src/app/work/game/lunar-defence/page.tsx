"use client";

import { CenterOverflow } from "@/app/components/center-overflow/center-overflow";
import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import Script from "next/script";
import "./lunar-defence.scss";

export default function Luigi() {
  return (
    <PageContents id="lunar-page">
      <Content>
        <Titles title={"Lunar Defence"} />

        <CenterOverflow>
          <div id="canvasBox">
            <div id="canvasFoundation"></div>
          </div>
        </CenterOverflow>

        <ClientSideMarkdown src="/works/games/lunar-defence/description.md" />

        <Footer />
      </Content>

      <Script src="/works/games/lunar-defence/scripts/lunar.js" />
    </PageContents>
  );
}
