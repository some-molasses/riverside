/**
 * Indexes all retrievable items into the search engine
 */

import { SearchIndexer } from "@/app/search-engine/search-indexer";

(async () => {
  new SearchIndexer().indexAllItems();
})();
