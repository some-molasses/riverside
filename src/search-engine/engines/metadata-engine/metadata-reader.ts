import { SearchRetriever } from "@/search-engine/search-retriever";
import { readFile } from "fs/promises";
import { RetrievableItemMetadata } from "../shared/retrievable-item";
import { MetadataEngine } from "./metadata-engine";

/**
 * Handles all metadata-writing operations required by document retrieval.
 */
export class MetadataReader {
  retriever: SearchRetriever;

  private _idsToMetadata: RetrievableItemMetadata[] = [];

  private _isInitialized: boolean = false;

  constructor(retriever: SearchRetriever) {
    this.retriever = retriever;
  }

  get documentCount(): number {
    return this._idsToMetadata.length;
  }

  async init() {
    if (this._isInitialized) {
      return;
    }

    this._idsToMetadata = JSON.parse(
      (await readFile(MetadataEngine.FILEPATHS.ID_TO_METADATA)).toString(),
    );

    this._isInitialized = true;
  }

  getMetadataById(id: number): RetrievableItemMetadata {
    this.init();

    if (this._idsToMetadata[id] === undefined) {
      throw new Error(`item with ID ${id} not found.`);
    }

    return this._idsToMetadata[id];
  }
}
