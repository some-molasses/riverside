import { IndexingEngine } from "./engines/indexing-engine";

export class SearchEngine {
  static init() {
    IndexingEngine.indexAllItems();
  }

  static async getAllItems() {}
}
