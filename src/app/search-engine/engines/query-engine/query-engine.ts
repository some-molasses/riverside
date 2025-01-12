import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";
import { RetrievalOptions, SearchRetriever } from "../../search-retriever";
import { LexiconEngine } from "../lexicon-engine/lexicon-engine";
import { QueryResult } from "../shared/query-result";
import {
  RetrievableItem,
  RetrievableItemConfig,
} from "../shared/retrievable-item";
import { Ranker } from "./ranker";

export class QueryEngine {
  retriever: SearchRetriever;

  ranker: Ranker;

  constructor(engine: SearchRetriever) {
    this.retriever = engine;
    this.ranker = new Ranker(this);
  }

  async query(
    query: string,
    options: RetrievalOptions,
  ): Promise<QueryResult[]> {
    const tokens = LexiconEngine.tokenize(query);
    const termIds = this.retriever.lexiconReader.tokensToTermIds(tokens);

    const rankedResults = this.ranker.rankBM25(termIds);

    return this.retriever.outputEngine.retrieveItems(
      rankedResults,
      query,
      options,
    );
  }

  async retrieveAllItems(options: RetrievalOptions): Promise<QueryResult[]> {
    const documentIds = Array.from(
      Array(this.retriever.metadataReader.documentCount).keys(),
    );

    return this.retriever.outputEngine.retrieveItems(documentIds, "", options);
  }

  async retrieveItem(itempath: string): Promise<RetrievableItem | null> {
    const configPath = path.join(
      // process.cwd(),
      itempath,
      "item-metadata.json",
    );

    try {
      await access(configPath, fs.constants.F_OK);
    } catch {
      console.warn(`${configPath} not found`);
      return null;
    }

    const config = readFile(configPath).then((res) =>
      JSON.parse(res.toString()),
    ) as Promise<RetrievableItemConfig>;

    return RetrievableItem.constructFromConfig(
      await config,
      -1, // @todo set ids
      path.join(
        // process.cwd(),
        itempath,
        "main.md",
      ),
    );
  }
}
