/* eslint-disable @next/next/no-img-element */
"use client";

import { CenterOverflow } from "@/app/components/center-overflow/center-overflow";
import { Content } from "@/app/components/content/content";
import { Footer } from "@/app/components/footer/footer";
import { ClientSideMarkdown } from "@/app/components/markdown/client-markdown";
import { PageContents } from "@/app/components/page-contents/page-contents";
import { Titles } from "@/app/components/titles/titles";
import { Heading2 } from "@/app/components/typography/variants/typography-variants";
import Script from "next/script";
import "./luigi.scss";

export default function Luigi() {
  return (
    <PageContents id="luigi-page">
      <Content>
        <Titles title={"Mario 1-1"} />

        <div id="controls">
          <Heading2>A/D TO MOVE, W TO JUMP, S TO SHOOT FIREBALLS</Heading2>
        </div>

        <CenterOverflow>
          <div id="canvasBox">
            <Images />

            <div id="canvasFoundation"></div>
          </div>
        </CenterOverflow>

        <ClientSideMarkdown src="/works/games/luigi/description.md" />

        <Footer />
      </Content>

      <Script src="/works/games/luigi/scripts/luigi.js" />
    </PageContents>
  );
}

const Images = () => (
  <>
    {/* <!-- Images are loaded as HTML elements first, then referred to by program.  This should make load times better --> */}

    {/* <!-- MarioSmall --> */}

    <img
      src="/works/games/luigi/images/player/mariosmall.png"
      id="/works/games/luigi/images/player/mariosmall.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallleft.png"
      id="/works/games/luigi/images/player/mariosmallleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariosmallwalkleftone.png"
      id="/works/games/luigi/images/player/mariosmallwalkleftone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallwalklefttwo.png"
      id="/works/games/luigi/images/player/mariosmallwalklefttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallwalkleftthree.png"
      id="/works/games/luigi/images/player/mariosmallwalkleftthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallwalkrightone.png"
      id="/works/games/luigi/images/player/mariosmallwalkrightone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallwalkrighttwo.png"
      id="/works/games/luigi/images/player/mariosmallwalkrighttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallwalkrightthree.png"
      id="/works/games/luigi/images/player/mariosmallwalkrightthree.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariosmalljumpright.png"
      id="/works/games/luigi/images/player/mariosmalljumpright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmalljumpleft.png"
      id="/works/games/luigi/images/player/mariosmalljumpleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariosmallslideright.png"
      id="/works/games/luigi/images/player/mariosmallslideright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariosmallslideleft.png"
      id="/works/games/luigi/images/player/mariosmallslideleft.png"
      className="sprite"
      alt=""
    />

    {/* <!-- MarioBig --> */}

    <img
      src="/works/games/luigi/images/player/mariobig.png"
      id="/works/games/luigi/images/player/mariobig.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigleft.png"
      id="/works/games/luigi/images/player/mariobigleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariobigwalkleftone.png"
      id="/works/games/luigi/images/player/mariobigwalkleftone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigwalklefttwo.png"
      id="/works/games/luigi/images/player/mariobigwalklefttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigwalkleftthree.png"
      id="/works/games/luigi/images/player/mariobigwalkleftthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigwalkrightone.png"
      id="/works/games/luigi/images/player/mariobigwalkrightone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigwalkrighttwo.png"
      id="/works/games/luigi/images/player/mariobigwalkrighttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigwalkrightthree.png"
      id="/works/games/luigi/images/player/mariobigwalkrightthree.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariobigjumpright.png"
      id="/works/games/luigi/images/player/mariobigjumpright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigjumpleft.png"
      id="/works/games/luigi/images/player/mariobigjumpleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/mariobigslideright.png"
      id="/works/games/luigi/images/player/mariobigslideright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariobigslideleft.png"
      id="/works/games/luigi/images/player/mariobigslideleft.png"
      className="sprite"
      alt=""
    />

    {/* <!-- MarioOther --> */}

    <img
      src="/works/games/luigi/images/player/mariomed.png"
      id="/works/games/luigi/images/player/mariomed.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/mariodead.png"
      id="/works/games/luigi/images/player/mariodead.png"
      className="sprite"
      alt=""
    />

    {/* <!-- LuigiSmall --> */}

    <img
      src="/works/games/luigi/images/player/luigismall.png"
      id="/works/games/luigi/images/player/luigismall.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallleft.png"
      id="/works/games/luigi/images/player/luigismallleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigismallwalkleftone.png"
      id="/works/games/luigi/images/player/luigismallwalkleftone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallwalklefttwo.png"
      id="/works/games/luigi/images/player/luigismallwalklefttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallwalkleftthree.png"
      id="/works/games/luigi/images/player/luigismallwalkleftthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallwalkrightone.png"
      id="/works/games/luigi/images/player/luigismallwalkrightone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallwalkrighttwo.png"
      id="/works/games/luigi/images/player/luigismallwalkrighttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallwalkrightthree.png"
      id="/works/games/luigi/images/player/luigismallwalkrightthree.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigismalljumpright.png"
      id="/works/games/luigi/images/player/luigismalljumpright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismalljumpleft.png"
      id="/works/games/luigi/images/player/luigismalljumpleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigismallslideright.png"
      id="/works/games/luigi/images/player/luigismallslideright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigismallslideleft.png"
      id="/works/games/luigi/images/player/luigismallslideleft.png"
      className="sprite"
      alt=""
    />

    {/* <!-- LuigiBig --> */}

    <img
      src="/works/games/luigi/images/player/luigibig.png"
      id="/works/games/luigi/images/player/luigibig.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigleft.png"
      id="/works/games/luigi/images/player/luigibigleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigibigwalkleftone.png"
      id="/works/games/luigi/images/player/luigibigwalkleftone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigwalklefttwo.png"
      id="/works/games/luigi/images/player/luigibigwalklefttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigwalkleftthree.png"
      id="/works/games/luigi/images/player/luigibigwalkleftthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigwalkrightone.png"
      id="/works/games/luigi/images/player/luigibigwalkrightone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigwalkrighttwo.png"
      id="/works/games/luigi/images/player/luigibigwalkrighttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigwalkrightthree.png"
      id="/works/games/luigi/images/player/luigibigwalkrightthree.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigibigjumpright.png"
      id="/works/games/luigi/images/player/luigibigjumpright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigjumpleft.png"
      id="/works/games/luigi/images/player/luigibigjumpleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/luigibigslideright.png"
      id="/works/games/luigi/images/player/luigibigslideright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigibigslideleft.png"
      id="/works/games/luigi/images/player/luigibigslideleft.png"
      className="sprite"
      alt=""
    />

    {/* <!-- FireBig --> */}

    <img
      src="/works/games/luigi/images/player/firebig.png"
      id="/works/games/luigi/images/player/firebig.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigleft.png"
      id="/works/games/luigi/images/player/firebigleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/firebigwalkleftone.png"
      id="/works/games/luigi/images/player/firebigwalkleftone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigwalklefttwo.png"
      id="/works/games/luigi/images/player/firebigwalklefttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigwalkleftthree.png"
      id="/works/games/luigi/images/player/firebigwalkleftthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigwalkrightone.png"
      id="/works/games/luigi/images/player/firebigwalkrightone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigwalkrighttwo.png"
      id="/works/games/luigi/images/player/firebigwalkrighttwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigwalkrightthree.png"
      id="/works/games/luigi/images/player/firebigwalkrightthree.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/firebigjumpright.png"
      id="/works/games/luigi/images/player/firebigjumpright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigjumpleft.png"
      id="/works/games/luigi/images/player/firebigjumpleft.png"
      className="sprite"
      alt=""
    />

    <img
      src="/works/games/luigi/images/player/firebigslideright.png"
      id="/works/games/luigi/images/player/firebigslideright.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/firebigslideleft.png"
      id="/works/games/luigi/images/player/firebigslideleft.png"
      className="sprite"
      alt=""
    />

    {/* <!-- LuigiOther --> */}

    <img
      src="/works/games/luigi/images/player/luigimed.png"
      id="/works/games/luigi/images/player/luigimed.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/luigidead.png"
      id="/works/games/luigi/images/player/luigidead.png"
      className="sprite"
      alt=""
    />

    {/* <!-- Bricks --> */}

    <img
      src="/works/games/luigi/images/bricksimage.png"
      id="/works/games/luigi/images/bricksimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/underbricksimage.png"
      id="/works/games/luigi/images/underbricksimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/groundimage.png"
      id="/works/games/luigi/images/groundimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/undergroundimage.png"
      id="/works/games/luigi/images/undergroundimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/qusedimage.png"
      id="/works/games/luigi/images/qusedimage.png"
      className="sprite"
      alt=""
    />

    {/* <!-- Entities --> */}

    <img
      src="/works/games/luigi/images/goombaone.png"
      id="/works/games/luigi/images/goombaone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/goombatwo.png"
      id="/works/games/luigi/images/goombatwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/koopatroopa.png"
      id="/works/games/luigi/images/koopatroopa.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/koopashell.png"
      id="/works/games/luigi/images/koopashell.png"
      className="sprite"
      alt=""
    />

    {/* <!-- Items --> */}

    <img
      src="/works/games/luigi/images/redmushroom.png"
      id="/works/games/luigi/images/redmushroom.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/fireflower.png"
      id="/works/games/luigi/images/fireflower.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/greenmushroom.png"
      id="/works/games/luigi/images/greenmushroom.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/star.png"
      id="/works/games/luigi/images/star.png"
      className="sprite"
      alt=""
    />

    {/* <!-- Other --> */}

    <img
      src="/works/games/luigi/images/transparent.png"
      id="/works/games/luigi/images/transparent.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/player/darkbig.png"
      id="/works/games/luigi/images/player/darkbig.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/castle.png"
      id="/works/games/luigi/images/castle.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/castleflag.png"
      id="/works/games/luigi/images/castleflag.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/coin.png"
      id="/works/games/luigi/images/coin.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/fireball.png"
      id="/works/games/luigi/images/fireball.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/fireworkone.png"
      id="/works/games/luigi/images/fireworkone.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/fireworktwo.png"
      id="/works/games/luigi/images/fireworktwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/fireworkthree.png"
      id="/works/games/luigi/images/fireworkthree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/flagclothimage.png"
      id="/works/games/luigi/images/flagclothimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/flagpoleimage.png"
      id="/works/games/luigi/images/flagpoleimage.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/pipetwox.png"
      id="/works/games/luigi/images/pipetwox.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/pipetwo.png"
      id="/works/games/luigi/images/pipetwo.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/pipethree.png"
      id="/works/games/luigi/images/pipethree.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/pipefour.png"
      id="/works/games/luigi/images/pipefour.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/pipetall.png"
      id="/works/games/luigi/images/pipetall.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/title.png"
      id="/works/games/luigi/images/title.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/onehundred.png"
      id="/works/games/luigi/images/onehundred.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/twohundred.png"
      id="/works/games/luigi/images/twohundred.png"
      className="sprite"
      alt=""
    />
    <img
      src="/works/games/luigi/images/onethousand.png"
      id="/works/games/luigi/images/onethousand.png"
      className="sprite"
      alt=""
    />
  </>
);
