import { LexiconEngine } from "../lexicon-engine/lexicon-engine";
import { BM25Computer } from "../query-engine/bm25-computer";
import { RetrievableItem } from "../shared/retrievable-item";
import { DescriptionFactory } from "./description-factory";

/**
 * Scores fragments of a text body to help to generate descriptions
 */
export class FragmentScorer {
  private descriptionFactory: DescriptionFactory;

  constructor(descriptionFactory: DescriptionFactory) {
    this.descriptionFactory = descriptionFactory;
  }

  private get retriever() {
    return this.descriptionFactory.outputEngine.retriever;
  }

  /**
   * @returns A numerical metric representing the relevance of the given sentence to the given query
   */
  scoreSentence(
    sentence: DescriptionFactory.Sentence,
    query: string,
    item: RetrievableItem,
  ) {
    // tokenize strings
    const sentenceTerms = LexiconEngine.tokenize(sentence.string);
    const queryTerms = LexiconEngine.tokenize(query);

    // get the importances of each term
    const importancesByTerm = this.getImportancesByTerm(
      [...sentenceTerms, ...queryTerms],
      item,
    );

    const averageTermImportance = Math.max(
      Object.values(importancesByTerm).reduce((sum, i) => sum + i, 0) /
        Object.values(importancesByTerm).length,
      1,
    );

    // map sentence terms to whether they exist in the query
    const queryInclusions = sentenceTerms.map((term) =>
      queryTerms.includes(term) ? importancesByTerm[term] : 0,
    );

    // get query length, number of query terms in the sentence
    const n_terms_found = queryInclusions.reduce(
      (acc: number, current: number) => acc + current,
      0,
    );

    // count of unique query terms in the sentence
    const n_unique_terms_found = this.countUniqueTerms(
      sentenceTerms,
      queryTerms,
    );
    // highest count of consecutive query terms
    const n_consec_terms = this.countConsecutiveTerms(queryInclusions);

    const score =
      n_terms_found +
      n_consec_terms * 2 +
      n_unique_terms_found * averageTermImportance;

    return score;
  }

  /**
   * @returns A map of each given term to its relative importance in the document,
   * as measured by BM25 score
   */
  private getImportancesByTerm(
    terms: string[],
    item: RetrievableItem,
  ): Record<string, number> {
    const computer = new BM25Computer(this.retriever);

    const importances: Record<string, number> = {};
    for (const term of terms) {
      importances[term] = computer.getBM25ComponentForDocument(
        item.id,
        this.retriever.lexiconReader.getTermFrequency(term, item),
        this.retriever.lexiconReader.getDocumentFrequency(term),
      );
    }

    return importances;
  }

  /**
   * @return the count of unique query terms found in the sentence
   */
  private countUniqueTerms(sentenceTerms: string[], queryTerms: string[]) {
    const foundTerms = new Set();
    for (const term of queryTerms) {
      if (sentenceTerms.includes(term)) {
        foundTerms.add(term);
      }
    }

    return Array.from(foundTerms.values()).length;
  }

  /**
   * @return the highest count of consecutive query terms found in the sentence
   */
  private countConsecutiveTerms(queryInclusions: number[]): number {
    // find consecutive query terms in the sentence
    const consecutiveCounts: number[] = [];
    for (let i = 0; i < queryInclusions.length; i++) {
      if (i === 0) {
        consecutiveCounts[i] = queryInclusions[i];
      } else if (queryInclusions[i] === 1) {
        consecutiveCounts[i] = consecutiveCounts[i - 1] + 1;
      } else {
        consecutiveCounts[i] = 0;
      }
    }

    // get highest consecutive count
    return consecutiveCounts.reduce(
      (prev, current) => Math.max(prev, current),
      0,
    );
  }
}
