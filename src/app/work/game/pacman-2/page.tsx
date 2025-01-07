"use client";

import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { Page } from "@/app/components/page/page";
import { Titles } from "@/app/components/titles/titles";
import { useEffect } from "react";
import { PacmanPage } from "./pacman-v2";
import "./pacman-v2.scss";

export default function PacmanV2() {
  useEffect(() => {
    setTimeout(() => {
      new PacmanPage();
    }, 1000);
  }, []);

  return (
    <Page id="pacman-v2-page">
      <Content>
        <Titles title={"Pac-man"} />

        <div id="canvas-container"></div>

        <h2>Controls</h2>
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
            <h3 style={{ textAlign: "center" }}>or</h3>
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
        <p>Press any of the movement keys shown above to start.</p>
        <div id="sprites-container"></div>

        <ClientSideMarkdown src="/works/games/lunar-defence/description.md" />

        <Footer />
      </Content>
    </Page>
  );
}
