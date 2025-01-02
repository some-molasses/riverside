import {
  RetrievableItem,
  RetrievedItem,
  SearchItemMetadata,
} from "@/search-engine/types";
import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";
import { SearchIndexer } from "../search-indexer";
import {
  RetrievalOptions,
  SearchRetrievalEngine,
} from "../search-retrieval-engine";

export class RetrievalEngine {
  engine: SearchRetrievalEngine;

  items: RetrievableItem[] = [];

  constructor(engine: SearchRetrievalEngine) {
    this.engine = engine;
  }

  async init() {
    this.items = JSON.parse(
      (await readFile(SearchIndexer.INDEXED_METADATA_FILEPATH)).toString(),
    );
  }

  async retrieveAllItems(
    options: RetrievalOptions,
  ): Promise<RetrievableItem[]> {
    return this.items
      .filter((item) => {
        if (options.tags.length === 0) {
          return true;
        }

        if (!item.metadata.tags) {
          return false;
        }

        for (const tag of options.tags) {
          if (item.metadata.tags.includes(tag)) {
            return true;
          }
        }

        return false;
      })
      .sort((a, b) =>
        new Date(b.metadata.date) < new Date(a.metadata.date) ? -1 : 1,
      );
  }

  async retrieveItem(itempath: string): Promise<RetrievedItem | null> {
    const mainPath = path.join(process.cwd(), itempath, "main.md");
    const metadataPath = path.join(
      process.cwd(),
      itempath,
      "item-metadata.json",
    );

    try {
      await access(mainPath, fs.constants.F_OK);
    } catch {
      console.warn(`${mainPath} not found`);
      return null;
    }

    try {
      await access(metadataPath, fs.constants.F_OK);
    } catch {
      console.warn(`${metadataPath} not found`);
      return null;
    }

    const main = readFile(mainPath).then((res) => res.toString());
    const meta = readFile(metadataPath).then((res) =>
      JSON.parse(res.toString()),
    ) as Promise<SearchItemMetadata>;

    return {
      title: (await meta).title,
      subtitle: (await meta).subtitle,
      date: new Date((await meta).date),
      tags: (await meta).tags ?? [],
      body: await main,
    };
  }
}
