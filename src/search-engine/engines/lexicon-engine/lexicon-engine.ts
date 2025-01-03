export type PostingsList = number[];

export class LexiconEngine {
  /**
   * Converts a given string to a series of tokens
   */
  static tokenize(str: string): string[] {
    return str
      .toLowerCase()
      .replaceAll(/\s/g, " ")
      .split(" ")
      .map((word) => word.matchAll(/([a-z0-9]+)/g))
      .flatMap((matches) => Array.from(matches).map((match) => match[0]));
  }
}
