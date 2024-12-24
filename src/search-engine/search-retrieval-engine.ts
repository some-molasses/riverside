import { RetrievalEngine } from "./engines/retrieval-engine";
import { RetrievableItem, RetrievedItem } from "./types";

export class SearchRetrievalEngine {
  initialized: boolean = false;

  retrievalEngine: RetrievalEngine;

  constructor() {
    this.retrievalEngine = new RetrievalEngine(this);
  }

  async conditionalInit() {
    if (this.initialized) {
      return;
    }

    await this.retrievalEngine.init();
    this.initialized = true;
  }

  async retrieveAllItems(): Promise<RetrievableItem[]> {
    await this.conditionalInit();
    return await this.retrievalEngine.retrieveAllItems();
  }

  async getItem(path: string): Promise<RetrievedItem> {
    await this.conditionalInit();
    const item = await this.retrievalEngine.retrieveItem(path);

    if (!item) {
      throw new Error("Item not found; need to throw 404 correctly here");
    }

    return item;
  }
}
