"use client";

import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import { useEffect, useState } from "react";
import { BrokenWiresInit } from "./scripts/wires";
import "./wires.scss";

export default function BrokenWires() {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        BrokenWiresInit();
      }, 500);
      setInitialized(true);
    }
  }, [initialized, setInitialized]);
  return (
    <PageContents id="wires-page">
      <Content>
        <Titles title={"Broken Wires"} />

        <div id="insWrap">
          <h2> Objective </h2>
          <p>
            Connect the <span className="cyan-span">blue</span> rectangle to the{" "}
            <span className="orange-span">orange</span> rectangle by rotating
            tiles to form a solid line between them.{" "}
          </p>
          <h2> Controls </h2>
          <p>
            Click on a tile to rotate it, both left and right click work. <br />{" "}
            Click the <strong>checkmark</strong> or press enter to solve the
            puzzle. <br /> <br /> Click <b>?</b> to see a solution to the
            current puzzle <br /> Click <b>⟲</b> to try a new puzzle <br />{" "}
            Click <b>∞</b> to allow the puzzle to cover your entire screen{" "}
            <br /> Click <b>⅟₁</b> to shrink the tiles{" "}
          </p>
          <a href="#">
            <div className="playButton" id="casual">
              <h3> CLICK HERE TO PLAY RELAXED MODE </h3>
            </div>
            <div className="playButton" id="comp">
              <h3> CLICK HERE TO PLAY CHALLENGE MODE </h3>
            </div>
          </a>
        </div>

        <div id="canvasBox">
          <div id="canvasFoundation"></div>
        </div>

        <ClientSideMarkdown src="/works/games/wires/description.md" />

        <Footer />

        <div id="imgs" style={{ display: "none" }}></div>
      </Content>
    </PageContents>
  );
}
