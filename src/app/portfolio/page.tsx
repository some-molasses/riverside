"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Content } from "../components/content/content";
import { PageContents } from "../components/page-contents/page-contents";
import {
  Heading1,
  Span,
} from "../components/typography/variants/typography-variants";
import { ResultList } from "./components/result-list/result-list";
import "./portfolio.scss";

const INPUT_TIMEOUT = 500;

export default function PageWrapper() {
  return (
    <Suspense>
      <Portfolio />
    </Suspense>
  );
}

function Portfolio() {
  const [query, setQuery] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const input = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();

  const fetcher = useCallback(async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  }, []);

  const filter = searchParams.get("filter") ?? "";
  const { data, isLoading } = useSWR(
    `/api/search/items?tags=${filter}&q=${query}`,
    fetcher,
  );

  const handleInput = () => {
    setLastUpdate(Date.now());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(input.current?.value ?? "");
    }, INPUT_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [lastUpdate]);

  const getTitles = (): { title: string; subtitle: string } => {
    switch (filter.toLowerCase()) {
      case "coding": {
        return {
          title: "code projects",
          subtitle: "games, tools, and minimal missing semicolons",
        };
      }
      case "game": {
        return {
          title: "games",
          subtitle:
            "pushing javascript canvas to do more than it was probably meant for",
        };
      }
      case "mathnews": {
        return {
          title: "mathNEWS",
          subtitle: "the reason i'm now cited on wikipedia",
        };
      }
      case "poem": {
        return {
          title: "poetry",
          subtitle:
            "sentiments, neat writing tricks, and completley arbitrary line breaks",
        };
      }
      case "recipe": {
        return {
          title: "food for thought",
          subtitle: "or thoughts for food? perhaps both!",
        };
      }
      case "short-story": {
        return {
          title: "short stories",
          subtitle: "inspired by things and maybe even people",
        };
      }
      case "writing": {
        return {
          title: "writings library",
          subtitle: "musings about the most important unimportant things",
        };
      }
      default: {
        return {
          title: "project search",
          subtitle: "a database of many things I have done",
        };
      }
    }
  };

  const { title, subtitle } = getTitles();

  return (
    <PageContents id="portfolio-page">
      <Content>
        <div id="titles">
          <Heading1>{title}</Heading1>
          <Span>{subtitle}</Span>
        </div>
        <div id="search-container">
          <input
            id="search"
            placeholder="search anything..."
            onChange={() => handleInput()}
            ref={input}
          />
          <Span variant="regular-light">
            this search functionality implemented with no external libraries.
          </Span>
        </div>
        <hr id="top-divider" />
        {!isLoading ? <ResultList items={data?.items} /> : null}
      </Content>
    </PageContents>
  );
}
