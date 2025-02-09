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
          <SideColumn id="cool" side="left" />
          <div id="center-col">
            <div id="timer">
              <span id="timer-text">15:000</span>
              <span id="current-player">team cool</span>
            </div>
            <div className="center-col-main active" id="playable-center-col">
              <input id="country-input"></input>
              <Span id="country-input-desc">enter a country or continent</Span>
            </div>
            <div className="center-col-main" id="endgame-center-col">
              <Span id="winning-team">team wins</Span>
            </div>
          </div>
          <SideColumn id="down" side="right" />
        </div>
      </CenterOverflow>
    </PageContents>
  );
}

const SideColumn: React.FC<{ id: string; side: string }> = ({ id, side }) => {
  return (
    <div className="side-col" id={`${side}-col`}>
      <div className="guess-list" id={`${id}-guesses`}></div>
      <span className="time-remaining" id={`${id}-time`}>
        15:00:00
      </span>
      <span className="team-name">team {id}</span>
    </div>
  );
};
