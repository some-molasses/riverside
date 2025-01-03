import fs from "fs";
import { access, readFile } from "fs/promises";
import { LexiconEngine } from "../lexicon-engine/lexicon-engine";

// As found in item-metadata.json files
export type RetrievableItemConfig = {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  thumbnail?: string;
};

// Stored in metadata file
export type RetrievableItemMetadata = RetrievableItemConfig & {
  id: number;
  location: string;
};

export class RetrievableItem {
  metadata: RetrievableItemMetadata;

  private _body: string | undefined;

  private constructor(metadata: RetrievableItemMetadata) {
    this.metadata = metadata;
  }

  get title(): string {
    return this.metadata.title;
  }

  get subtitle(): string | undefined {
    return this.metadata.subtitle;
  }

  get date(): Date {
    return new Date(this.metadata.date);
  }

  get id(): number {
    return this.metadata.id;
  }

  get location(): string {
    return this.metadata.location;
  }

  get tags(): string[] {
    return this.metadata.tags;
  }

  get thumbnail(): string | undefined {
    return this.metadata.thumbnail;
  }

  /**
   * @returns the contents of the item
   */
  async getBody(): Promise<string> {
    if (this._body !== undefined) {
      return this._body;
    }

    try {
      await access(this.location, fs.constants.F_OK);
    } catch {
      throw new Error(`${this.location} not found`);
    }

    this._body = await readFile(this.location).then((file) => file.toString());

    return this._body!;
  }

  /**
   * @returns a list of tokens for this item
   */
  async getTokens(): Promise<string[]> {
    let contents: string;

    if (this.location.includes(".ts")) {
      console.warn("handle games somehow");
      return [];
    } else if (this.location.includes("main.md")) {
      contents = await this.getBody();
    } else {
      throw new Error(`Unexpected item format found: ${this.location}`);
    }

    const tokens = LexiconEngine.tokenize(contents);

    return tokens;
  }

  /**
   * @returns a basic, query-unbiased description of the item
   */
  async getDescription(): Promise<string> {
    const tokens = (await this.getBody())
      .slice(0, 300) // first n characters
      .split(/\s/) // split on spaces
      .slice(0, -1); // remove last word because it is likely cut off;

    let endToken = tokens.length; // exclusive

    tokens.forEach((token, index) => {
      if (token.includes("#") && index > 20) {
        endToken = index;
      }
    });

    const desc =
      tokens
        .slice(0, endToken) // slice unwanted tokens
        .map((token) => token.replaceAll(/\#/g, "").trim()) // remove heading format
        .join(" ")
        .trim() + "...";

    return desc;
  }

  /**
   * Constructs an item using the data found in an item-metadata.json file
   */
  static constructFromConfig(
    config: RetrievableItemConfig,
    id: number,
    location: string,
  ): RetrievableItem {
    return new RetrievableItem({ ...config, id, location });
  }

  /**
   * Constructs an item using the data found in the metadata directory
   */
  static constructFromMetadata(
    metadata: RetrievableItemMetadata,
  ): RetrievableItem {
    return new RetrievableItem(metadata);
  }
}
