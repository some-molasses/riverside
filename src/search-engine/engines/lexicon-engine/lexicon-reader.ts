import { SearchRetriever } from "@/search-engine/search-retriever";
import { readFile } from "fs/promises";
import { MetadataEngine } from "../metadata-engine/metadata-engine";
import { PostingsList } from "./lexicon-engine";

/**
 * Handles data retrieval from the lexicon during querying.
 */
export class LexiconReader {
  retriever: SearchRetriever;

  invertedIndex: PostingsList[] = [];

  private _isInitialized: boolean = false;
  private _lexicon: Record<string, number> = {};

  constructor(retriever: SearchRetriever) {
    this.retriever = retriever;
  }

  async init() {
    if (this._isInitialized) {
      return;
    }

    this._lexicon = JSON.parse(
      (await readFile(MetadataEngine.FILEPATHS.LEXICON)).toString(),
    );
    this.invertedIndex = JSON.parse(
      (await readFile(MetadataEngine.FILEPATHS.INVERTED_INDEX)).toString(),
    );

    this._isInitialized = true;
  }

  /**
   * Returns the
   */
  tokensToTermIds(tokens: string[]): number[] {
    return tokens
      .map((token) => this._lexicon[token])
      .filter((termId) => termId !== undefined); // filter terms not found
  }
}
