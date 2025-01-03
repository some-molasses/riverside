import { PostingsList } from "../lexicon-engine/lexicon-engine";
import { QueryEngine } from "./query-engine";

export class Ranker {
  queryEngine: QueryEngine;

  constructor(queryEngine: QueryEngine) {
    this.queryEngine = queryEngine;
  }

  /**
   * This method included for simplicity. Not recommended for actual use
   */
  booleanOR(terms: number[]) {
    const postingsLists: PostingsList[] = terms.map(
      (term) => this.queryEngine.engine.lexiconReader.invertedIndex[term],
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

    console.log(postingsLists, items);

    return Array.from(items);
  }
}
