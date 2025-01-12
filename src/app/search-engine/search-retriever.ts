import { LexiconReader } from "./engines/lexicon-engine/lexicon-reader";
import { MetadataReader } from "./engines/metadata-engine/metadata-reader";
import { OutputEngine } from "./engines/output-engine/output-engine";
import { QueryEngine } from "./engines/query-engine/query-engine";
import { QueryResult } from "./engines/shared/query-result";
import { RetrievableItem } from "./engines/shared/retrievable-item";

export interface RetrievalOptions {
  tags: string[];
  sort?: "date";
}

export class SearchRetriever {
  initialized: boolean = false;

  queryEngine: QueryEngine = new QueryEngine(this);
  outputEngine: OutputEngine = new OutputEngine(this);

  metadataReader: MetadataReader = new MetadataReader(this);
  lexiconReader: LexiconReader = new LexiconReader(this);

  async init() {
    await this.metadataReader.init();
    await this.lexiconReader.init();
  }

  async query(
    query: string | null,
    options: RetrievalOptions,
  ): Promise<QueryResult[]> {
    await this.init();

    if (!query) {
      return this.queryEngine.retrieveAllItems({ sort: "date", ...options });
    }

    return this.queryEngine.query(query, options);
  }

  async retrieveItem(path: string): Promise<RetrievableItem> {
    await this.init();

    const item = await this.queryEngine.retrieveItem(path);

    if (!item) {
      throw new Error("Item not found; need to throw 404 correctly here");
    }

    return item;
  }
}
