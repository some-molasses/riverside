import { IndexingEngine } from "./engines/indexing-engine/indexing-engine";
import { LexiconWriter } from "./engines/lexicon-engine/lexicon-writer";
import { MetadataWriter } from "./engines/metadata-engine/metadata-writer";

export class SearchIndexer {
  indexingEngine: IndexingEngine = new IndexingEngine(this);
  metadataWriter: MetadataWriter = new MetadataWriter(this);
  lexiconWriter: LexiconWriter = new LexiconWriter(this);

  /**
   * Finds all retreivable items, indexes them to the search engine data folder
   */
  async indexAllItems(): Promise<void> {
    await this.indexingEngine.indexAllItems();
  }
}
