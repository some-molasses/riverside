import { IndexingEngine } from "./engines/indexing-engine";
import { RetrievalEngine } from "./engines/retrieval-engine";
import { RetreivableItem, RetrievedItem } from "./types";

export class SearchEngine {
  static initialized: boolean = false;

  static async conditionalInit() {
    if (this.initialized) {
      return;
    }

    await IndexingEngine.indexAllItems();
    this.initialized = true;
  }

  static async retrieveAllItems(): Promise<RetreivableItem[]> {
    await this.conditionalInit();
    return IndexingEngine.items.sort((a, b) =>
      new Date(b.metadata.date) < new Date(a.metadata.date) ? -1 : 1,
    );
  }

  static async getItem(path: string): Promise<RetrievedItem> {
    await this.conditionalInit();
    const item = await RetrievalEngine.retrieveItem(path);

    if (!item) {
      throw new Error("Item not found; need to throw 404 correctly here");
    }

    return item;
  }
}
