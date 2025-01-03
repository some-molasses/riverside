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
  engine: SearchRetriever;

  ranker: Ranker = new Ranker(this);

  constructor(engine: SearchRetriever) {
    this.engine = engine;
  }

  async query(
    query: string,
    options: RetrievalOptions,
  ): Promise<QueryResult[]> {
    const tokens = LexiconEngine.tokenize(query);
    const termIds = this.engine.lexiconReader.tokensToTermIds(tokens);

    const rankedResults = this.ranker.booleanOR(termIds);

    return this.retrieveItemsByIDs(rankedResults, options);
  }

  async retrieveAllItems(options: RetrievalOptions): Promise<QueryResult[]> {
    const documentIds = Array.from(
      Array(this.engine.metadataReader.documentCount).keys(),
    );

    return this.retrieveItemsByIDs(documentIds, options);
  }

  async retrieveItem(itempath: string): Promise<RetrievableItem | null> {
    const configPath = path.join(process.cwd(), itempath, "item-metadata.json");

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
      path.join(process.cwd(), itempath, "main.md"),
    );
  }

  private async retrieveItemsByIDs(
    ids: number[],
    options: RetrievalOptions,
  ): Promise<QueryResult[]> {
    return await Promise.all(
      (
        await Promise.all(
          ids.map(
            async (id) => await this.engine.metadataReader.getMetadataById(id),
          ),
        )
      )
        .filter((metadata) => {
          if (options.tags.length === 0) {
            return true;
          }

          if (!metadata.tags) {
            return false;
          }

          for (const tag of options.tags) {
            if (metadata.tags.includes(tag)) {
              return true;
            }
          }

          return false;
        })
        .sort((a, b) => (new Date(b.date) < new Date(a.date) ? -1 : 1))
        .map(
          async (metadata) =>
            await QueryResult.construct(
              RetrievableItem.constructFromMetadata(metadata),
            ),
        ),
    );
  }
}
