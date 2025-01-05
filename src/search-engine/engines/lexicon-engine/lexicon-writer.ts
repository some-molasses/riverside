import { SearchIndexer } from "@/search-engine/search-indexer";
import { writeFileSync } from "fs";
import { MetadataEngine } from "../metadata-engine/metadata-engine";
import { RetrievableItem } from "../shared/retrievable-item";
import { PostingsList } from "./lexicon-engine";

/**
 * Handles lexicon construction during indexing.
 */
export class LexiconWriter {
  indexer: SearchIndexer;

  termToIds: Record<string, number> = {};
  idToTerms: string[] = [];

  invertedIndex: PostingsList[] = [];
  docLengths: number[] = [];

  constructor(indexer: SearchIndexer) {
    this.indexer = indexer;
  }

  /**
   * Updates the inverted index to track the counts of each term found in the given document
   *
   * Does not write the inverted index to any file
   */
  async indexDocumentTerms(item: RetrievableItem) {
    const termIds = this.convertTokensToTermIds(await item.getTokens());
    const termCounts = this.getTermCounts(termIds);

    for (const [termId, count] of termCounts) {
      if (this.invertedIndex[termId] === undefined) {
        this.invertedIndex[termId] = [];
      }

      this.invertedIndex[termId].push(item.id, count);
    }

    this.docLengths[item.id] = termIds.length;
  }

  /**
   * Writes the inverted index and lexicon to the doucment store
   */
  writeLexicon() {
    writeFileSync(
      MetadataEngine.FILEPATHS.DOC_LENGTHS,
      JSON.stringify(this.docLengths),
    );

    writeFileSync(
      MetadataEngine.FILEPATHS.INVERTED_INDEX,
      JSON.stringify(this.invertedIndex),
    );

    writeFileSync(
      MetadataEngine.FILEPATHS.LEXICON,
      JSON.stringify(this.termToIds),
    );
  }

  /**
   * Maps a given list of tokens to term IDs. If no term ID exists for any token,
   * creates a new term ID for that token.
   */
  private convertTokensToTermIds(tokens: string[]): number[] {
    return tokens.map((token) => {
      if (!this.termToIds[token]) {
        this.termToIds[token] = this.idToTerms.length;
        this.idToTerms.push(token);
      }

      return this.termToIds[token];
    });
  }

  /**
   * Counts how many times each term ID appears in the given array
   */
  private getTermCounts(termIds: number[]) {
    const counts: Map<number, number> = new Map();

    for (const term of termIds) {
      if (counts.has(term)) {
        counts.set(term, counts.get(term)! + 1);
      } else {
        counts.set(term, 1);
      }
    }

    return counts;
  }
}
