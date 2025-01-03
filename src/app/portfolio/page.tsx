"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Content } from "../components/content/content";
import { Page } from "../components/page/page";
import {
  Heading1,
  Span,
} from "../components/typography/variants/typography-variants";
import { ResultList } from "./components/result-list/result-list";
import "./portfolio.scss";

const INPUT_TIMEOUT = 500;

export default function Portfolio() {
  const [query, setQuery] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const input = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();

  const fetcher = useCallback(async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  }, []);

  const filters = searchParams.get("filter") ?? "";
  const { data, isLoading } = useSWR(
    `/api/search/items?tags=${filters}&q=${query}`,
    fetcher,
  );

  const handleInput = () => {
    setLastUpdate(Date.now());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // if (Date.now() - INPUT_TIMEOUT > lastUpdate) {
      setQuery(input.current?.value ?? "");
      // }
    }, INPUT_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [lastUpdate]);

  return (
    <Page id="portfolio-page">
      <Content>
        <div id="titles">
          <Heading1>project search</Heading1>
          <Span>a database of many things I have done</Span>
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
    </Page>
  );
}
