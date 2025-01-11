import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";

// As found in item-metadata.json files
export type RetrievableItemConfig = {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  description?: string;
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

  get source(): string {
    const relPath = this.metadata.description ?? this.metadata.location;
    return path.join(
      // process.cwd(),
      relPath,
    );
  }

  get tags(): string[] {
    return this.metadata.tags;
  }

  get thumbnail(): string | undefined {
    return this.metadata.thumbnail;
  }

  /**
   * if this gets used in retrieval, Vercel will throw a fit, as it cannot load .md files into its API functions
   *
   * @returns the contents or textual description of the item
   */
  async getNonRetrievalTextBody(): Promise<string> {
    if (this._body !== undefined) {
      return this._body;
    }

    try {
      await access(this.source, fs.constants.F_OK);
    } catch {
      throw new Error(`${this.source} not found`);
    }

    this._body = await readFile(this.source).then((file) => file.toString());

    return this._body!;
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
