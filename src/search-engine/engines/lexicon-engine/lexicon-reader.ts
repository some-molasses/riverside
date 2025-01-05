import { SearchRetriever } from "@/search-engine/search-retriever";
import { readFile } from "fs/promises";
import { MetadataEngine } from "../metadata-engine/metadata-engine";
import { RetrievableItem } from "../shared/retrievable-item";
import { PostingsList } from "./lexicon-engine";

/**
 * Handles data retrieval from the lexicon during querying.
 */
export class LexiconReader {
  retriever: SearchRetriever;

  invertedIndex: PostingsList[] = [];

  private _isInitialized: boolean = false;
  private _lexicon: Record<string, number> = {};
  private _documentLengths: number[] = [];

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
    this._documentLengths = JSON.parse(
      (await readFile(MetadataEngine.FILEPATHS.DOC_LENGTHS)).toString(),
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

  get collectionSize(): number {
    return this._documentLengths.length;
  }

  get averageDocumentLength(): number {
    return (
      this._documentLengths.reduce((acc, l) => acc + l, 0) /
      this._documentLengths.length
    );
  }

  getDocumentLength(documentId: number): number {
    return this._documentLengths[documentId];
  }

  getTermFrequency(term: string, item: RetrievableItem): number {
    const termId = this._lexicon[term];
    const postings = this.invertedIndex[termId];

    for (let i = 0; i < postings.length; i += 2) {
      if (postings[i] === item.id) {
        return postings[i + 1];
      }
    }

    return 0;
  }

  getDocumentFrequency(term: string): number {
    const termId = this._lexicon[term];
    const postings = this.invertedIndex[termId];

    return postings.length / 2;
  }
}
