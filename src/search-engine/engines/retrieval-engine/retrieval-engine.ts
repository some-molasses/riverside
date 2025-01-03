import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";
import {
  RetrievalOptions,
  SearchRetrievalEngine,
} from "../../search-retrieval-engine";
import {
  RetrievableItem,
  RetrievableItemConfig,
} from "../shared/retrievable-item";

export class RetrievalEngine {
  engine: SearchRetrievalEngine;

  constructor(engine: SearchRetrievalEngine) {
    this.engine = engine;
  }

  async init() {}

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
}
