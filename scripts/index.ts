/**
 * Indexes all retrievable items into the search engine
 */

import { SearchIndexer } from "@/search-engine/search-indexer";

(async () => {
  new SearchIndexer().indexAllItems();
})();
