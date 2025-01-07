"use client";

import { CenterOverflow } from "@/app/components/center-overflow/center-overflow";
import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { Column, Row } from "@/app/components/layout/layout";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import { useEffect, useState } from "react";
import { RunInfectionModel } from "./infection";
import "./infection.scss";

export default function Infection() {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        RunInfectionModel();
      }, 500);
      setInitialized(true);
    }
  }, [initialized, setInitialized]);

  return (
    <PageContents id="infection-page">
      <Content>
        <Titles title={"Infection Modelling"} />

        <h2>
          Status: <span id="infectionStatus">Running</span>
        </h2>

        <CenterOverflow>
          <canvas id="infectionCanvas"></canvas>
          <Chart />
        </CenterOverflow>

        <ClientSideMarkdown src="/works/gadgets/infection/description.md" />
        <ColourLegend />

        <Footer />
      </Content>
    </PageContents>
  );
}

const Chart: React.FC = () => (
  <div id="chartWrapper">
    <div id="chartControls">
      <h3>Controls</h3>
      <div id="controlAccordions">
        <div className="accordionHead">
          <h4>Shown Statistics</h4>
        </div>
        <div className="accordionBody" style={{ display: "none" }}>
          <table id="showLines">
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Never infected</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" defaultChecked />
                </td>
                <td>Total cases</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Asymptomatic cases</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Symptomatic cases</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Survivors</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Vaccinations</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" defaultChecked />
                </td>
                <td>Deaths</td>
              </tr>
              <tr></tr>
              <tr>
                <td>
                  <input type="checkbox" id="unlockChart" />
                </td>
                <td>
                  <i>Unlock Chart</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="accordionHead">
          <h4>Infection Details</h4>
        </div>
        <div className="accordionBody" style={{ display: "none" }}>
          <Column id="infection-details">
            <Row>
              <input
                className="inputBottomLine"
                id="secondsUntilAsymptomatic"
              />
              <span>Seconds until asymptomatic</span>
            </Row>
            <Row>
              <input className="inputBottomLine" id="secondsUntilSymptomatic" />
              <span>Seconds until symptomatic</span>
            </Row>
            <Row>
              <input className="inputBottomLine" id="secondsUntilConclusion" />
              <span>Seconds until case conclusion</span>
            </Row>
            <Row>
              <input type="checkbox" id="showNonContagious" />
              <span>Show non-contagious cases</span>
            </Row>
            <Row>
              <span>Asymptomatic case rate: </span>
              <span id="asymptomaticDisplay"></span>%
            </Row>
            <Row>
              <input type="range" id="asymptomaticRate" />
            </Row>
            <Row>
              <span>Mortality rate: </span>
              <span id="mortalityDisplay"></span>%
            </Row>
            <Row>
              <input type="range" id="mortalityRate" />
            </Row>
          </Column>
        </div>

        <div className="accordionHead">
          <h4>Anti-infection Measures</h4>
        </div>
        <div className="accordionBody" style={{ display: "none" }}>
          <table>
            <tbody>
              <tr>
                <td>
                  Vaccination rate: <span id="vaccinationDisplay"></span>%
                </td>
              </tr>
              <tr>
                <td>
                  <input type="range" id="vaccinationRate" />
                </td>
              </tr>
              <tr>
                <td>Extent of physical distancing:</td>
              </tr>
              <tr>
                <td>
                  <input type="range" id="physDistancing" />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" id="isolateSymptomatic" />
                </td>
                <td>Isolate symptomatic cases</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Column>
          <button className="textButton" id="restartNoCovid">
            Restart simulation
          </button>
          <button className="textButton" id="restartCovid">
            Restart simulation with COVID-19 parameters
          </button>
        </Column>
      </div>
    </div>
    <div id="chartCanvasWrapper">
      <canvas id="infectionChart"></canvas>
    </div>
  </div>
);

const ColourLegend: React.FC = () => (
  <div>
    <h2>What do the colours mean?</h2>
    <table className="legend">
      <tbody>
        <tr>
          <td>
            <div className="dot" id="neverdot"></div>
            <p>Never been infected</p>
          </td>
          <td>
            <div className="dot" id="surviveddot"></div>
            <p>Survived</p>
          </td>
        </tr>
        <tr>
          <td>
            <div className="dot" id="gestdot">
              <div className="minidot"></div>
            </div>
            <p>Infected, asymptomatic, non-contagious</p>
          </td>
          <td>
            <div className="dot" id="deaddot"></div>
            <p>Died</p>
          </td>
        </tr>
        <tr>
          <td>
            <div className="dot" id="asympdot"></div>
            <p>Infected, asymptomatic, contagious</p>
          </td>
          <td>
            <div className="dot" id="vaxdot"></div>
            <p>Vaccinated</p>
          </td>
        </tr>
        <tr>
          <td>
            <div className="dot" id="sympdot"></div>
            <p>Infected, symptomatic, contagious</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
