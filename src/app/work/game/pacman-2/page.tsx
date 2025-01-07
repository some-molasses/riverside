"use client";

import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import {
  Heading2,
  Paragraph,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { useEffect, useState } from "react";
import { PacmanPage } from "./pacman-v2";
import "./pacman-v2.scss";

export default function PacmanV2() {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        new PacmanPage();
      }, 500);
      setInitialized(true);
    }
  }, [initialized, setInitialized]);

  return (
    <PageContents id="pacman-v2-page">
      <Content>
        <Titles title="Pac-Man" />

        <div id="canvas-container"></div>

        <Heading2>Controls</Heading2>

        <Controls />

        <Paragraph className="">
          Press any of the movement keys shown above to start.
        </Paragraph>
        <div id="sprites-container"></div>

        <ClientSideMarkdown src="/works/games/pacman-2/description.md" />

        <Footer />
      </Content>
    </PageContents>
  );
}

const Controls: React.FC = () => (
  <div className="horizontal-grid">
    <div>
      <table className="pac-controls-table">
        <tbody>
          <tr>
            <td className="hide-cell"></td>
            <td>W</td>
            <td className="hide-cell"></td>
          </tr>
          <tr>
            <td>A</td>
            <td>S</td>
            <td>D</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <Span>or</Span>
    </div>
    <div>
      <table className="pac-controls-table">
        <tbody>
          <tr>
            <td className="hide-cell"></td>
            <td>&#x2191;</td>
            <td className="hide-cell"></td>
          </tr>
          <tr>
            <td>&#x2190;</td>
            <td>&#x2193;</td>
            <td>&#x2192;</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
