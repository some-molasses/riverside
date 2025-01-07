import { RetrievableItem } from "../shared/retrievable-item";
import { FragmentScorer } from "./fragment-scorer";
import { OutputEngine } from "./output-engine";

export namespace DescriptionFactory {
  export interface Sentence {
    string: string;
    punctuation: string;
    index: number;
  }
}

const MAXIMUM_LENGTH_WORDS = 40;

export class DescriptionFactory {
  outputEngine: OutputEngine;

  private fragmentScorer: FragmentScorer = new FragmentScorer(this);

  constructor(outputEngine: OutputEngine) {
    this.outputEngine = outputEngine;
  }

  async getDescription(item: RetrievableItem, query: string): Promise<string> {
    const itemContents = await item.getTextBody();

    const cleanedBody = itemContents // try to remove images, captions, etc.
      .replaceAll(/!?\[.*\]/g, "")
      .replaceAll(/\(.*\)/g, "");

    const sentences: DescriptionFactory.Sentence[] = this.mergeSentences(
      Array.from(cleanedBody.matchAll(/[^.!?]+[.!?]/g)).map((match, index) => ({
        string: match[0].substring(0, match[0].length - 1).trim(),
        punctuation: match[0][match[0].length - 1],
        index,
      })),
    );

    const bestSentences = this.selectSentences(
      sentences.map((sentence) => ({
        sentence,
        score: this.fragmentScorer.scoreSentence(sentence, query, item),
      })),
    );

    return this.formatSentences(bestSentences, query);
  }

  private formatSentences(
    sentences: DescriptionFactory.Sentence[],
    query: string,
  ): string {
    const sortedSentences = sentences.sort((a, b) => a.index - b.index);

    const onelineSummary = sortedSentences
      .map(
        (sentence) =>
          `<span class="result-sentence">${sentence.string}${sentence.punctuation}</span>`,
      )
      .join(" [...] ")
      .replaceAll(/\s/g, " ")
      .replaceAll(/[\\\_\#]+/g, ""); // try to replace markdown characters

    const longSummary = this.identifyQueryTerms(onelineSummary, query);

    return longSummary + "...";
  }

  /**
   * @returns The provided description, with all query terms highlighted
   */
  private identifyQueryTerms(summary: string, query: string): string {
    const queryTerms = Array.from(
      query.toLowerCase().matchAll(/[a-zA-Z0-9]+/g),
    ).map((match) => match[0]);

    for (const term of queryTerms) {
      summary = summary.replaceAll(
        new RegExp(term, "ig"),
        (match) => `<span class="query-term">${match}</span>`,
      );
    }

    return summary;
  }

  /**
   * Merges all sentences from the sentence list, such that all remaining sentences have at least 5 words
   */
  private mergeSentences(
    sentences: DescriptionFactory.Sentence[],
  ): DescriptionFactory.Sentence[] {
    const merged: DescriptionFactory.Sentence[] = [];
    let sentenceMergeQueue: DescriptionFactory.Sentence[] = [];

    for (const sentence of sentences) {
      if (sentence.string.split(/\s/).length < 5) {
        sentenceMergeQueue.push(sentence);
      } else {
        let mergedResult: string = "";
        for (const mergeSentence of sentenceMergeQueue) {
          mergedResult +=
            mergeSentence.string + mergeSentence.punctuation + " ";
        }

        merged.push({
          string: mergedResult + sentence.string,
          punctuation: sentence.punctuation,
          index: sentence.index,
        });

        sentenceMergeQueue = [];
      }
    }

    return merged;
  }

  private selectSentences(
    scoredSentences: { sentence: DescriptionFactory.Sentence; score: number }[],
  ): DescriptionFactory.Sentence[] {
    const selections: DescriptionFactory.Sentence[] = [];

    const sorted = scoredSentences.sort((a, b) => b.score - a.score);

    for (const { sentence } of sorted) {
      selections.push(sentence);

      const currentTotalLen = selections.reduce(
        (acc, s) => acc + s.string.length + 1,
        0,
      );

      if (currentTotalLen > MAXIMUM_LENGTH_WORDS * 5) {
        break;
      }
    }

    return selections;
  }
}
