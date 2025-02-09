"use client";

import { CenterOverflow } from "@/app/components/center-overflow/center-overflow";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Span } from "@/app/components/typography/variants/typography-variants";
import { useEffect, useState } from "react";
import { CoolDownGame } from "./cool-down";
import "./cool-down.scss";

export default function CoolDownPage() {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        CoolDownGame.init();
      }, 500);
      setInitialized(true);
    }
  }, [initialized, setInitialized]);

  return (
    <PageContents id="cool-down-page">
      <CenterOverflow>
        <div id="cool-down-main">
          <div className="side-col" id="left-col">
            team cool
          </div>
          <div id="center-col">
            <div id="timer">
              <span id="timer-text">10:00:00</span>
              <span id="current-player">player 1</span>
            </div>
            <input id="country-input"></input>
            <Span id="country-input-desc">enter a country or continent</Span>
          </div>
          <div className="side-col" id="right-col">
            team down
          </div>
        </div>
      </CenterOverflow>
    </PageContents>
  );
}
