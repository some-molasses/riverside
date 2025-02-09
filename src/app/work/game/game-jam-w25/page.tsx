"use client";

import { CenterOverflow } from "@/app/components/center-overflow/center-overflow";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
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
          <div className="cooldown-contents active" id="tutorial-contents">
            <Titles title="cool-down" white></Titles>
            <ClientSideMarkdown src="/works/games/game-jam-w25/description.md" />
            <button id="start-button">begin</button>
          </div>
          <div className="cooldown-contents" id="game-contents">
            <SideColumn id="cool" side="left" />
            <div id="center-col">
              <div id="timer">
                <span id="timer-text">{CoolDownGame.STARTING_SECONDS}:000</span>
                <span id="current-player">team cool</span>
              </div>
              <div className="center-col-main active" id="playable-center-col">
                <input id="country-input"></input>
                <Span id="country-input-desc">enter a country</Span>
              </div>
              <div className="center-col-main" id="endgame-center-col">
                <Span id="winning-team">team wins</Span>
                <span id="restart-text">refresh the page to play again</span>
              </div>
            </div>
            <SideColumn id="down" side="right" />
          </div>
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
        {CoolDownGame.STARTING_SECONDS}:000
      </span>
      <span className="team-name">team {id}</span>
    </div>
  );
};
