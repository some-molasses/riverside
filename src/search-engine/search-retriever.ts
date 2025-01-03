import { LexiconReader } from "./engines/lexicon-engine/lexicon-reader";
import { MetadataReader } from "./engines/metadata-engine/metadata-reader";
import { QueryEngine } from "./engines/query-engine/query-engine";
import { QueryResult } from "./engines/shared/query-result";
import { RetrievableItem } from "./engines/shared/retrievable-item";

export interface RetrievalOptions {
  tags: string[];
}

export class SearchRetriever {
  initialized: boolean = false;

  queryEngine: QueryEngine = new QueryEngine(this);
  metadataReader: MetadataReader = new MetadataReader(this);
  lexiconReader: LexiconReader = new LexiconReader(this);

  async query(query: string): Promise<QueryResult[]> {
    return this.queryEngine.query(query, { tags: [] });
  }

  async retrieveItem(path: string): Promise<RetrievableItem> {
    const item = await this.queryEngine.retrieveItem(path);

    if (!item) {
      throw new Error("Item not found; need to throw 404 correctly here");
    }

    return item;
  }

  async retrieveAllItems(options: RetrievalOptions): Promise<QueryResult[]> {
    return await this.queryEngine.retrieveAllItems(options);
  }
}
