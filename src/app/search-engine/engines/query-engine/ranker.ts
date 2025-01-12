import { PostingsList } from "../lexicon-engine/lexicon-engine";
import { BM25Computer } from "./bm25-computer";
import { QueryEngine } from "./query-engine";

export class Ranker {
  queryEngine: QueryEngine;

  bm25Computer: BM25Computer;

  constructor(queryEngine: QueryEngine) {
    this.queryEngine = queryEngine;
    this.bm25Computer = new BM25Computer(this.retriever);
  }

  get retriever() {
    return this.queryEngine.retriever;
  }

  /**
   * This method included for simplicity. Not recommended for actual use
   */
  rankBooleanOR(terms: number[]): number[] {
    const postingsLists: PostingsList[] = terms.map(
      (term) => this.queryEngine.retriever.lexiconReader.invertedIndex[term],
    );

    const items: Set<number> = new Set();

    postingsLists.forEach((list) => {
      list.forEach((id, index) => {
        if (index % 2 === 0) {
          // document ids are stored at even indices
          items.add(id);
        }
      });
    });

    return Array.from(items);
  }

  /**
   * Returns the document IDs of documents that match any term in the given query
   */
  rankBM25(queryTerms: number[]): number[] {
    const queryTermPostingsLists: PostingsList[] = queryTerms.map(
      (termId) => this.retriever.lexiconReader.invertedIndex[termId],
    );

    const documentScores: Record<number, number> = {};

    for (const postingsList of queryTermPostingsLists) {
      // walk down postings list
      for (let i = 0; i < postingsList.length; i += 2) {
        const docId = postingsList[i];
        const termFrequency = postingsList[i + 1];
        const documentsContainingTerm = postingsList.length / 2;

        if (documentScores[docId] === undefined) {
          documentScores[docId] = 0;
        }

        // accumulate scores for each document, term-by-term
        documentScores[docId] += this.bm25Computer.getBM25ComponentForDocument(
          docId,
          termFrequency,
          documentsContainingTerm,
        );
      }
    }

    // 5. Output the documents & scores from the priority queue in sorted order.
    const sortedScores = Object.entries(documentScores).sort(
      ([, a_score], [, b_score]) => b_score - a_score,
    );

    return sortedScores.map(([docId]) => Number(docId));
  }
}
