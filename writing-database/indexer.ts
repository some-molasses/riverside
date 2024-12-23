import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";

type WritingMetadata = {
  title: string;
  subtitle?: string;
  date: string;
};

type WritingWork = {
  title: string;
  subtitle?: string;
  date: Date;
  body: string;
};

export class WritingIndexer {
  static readonly WRITING_DIRECTORY = "writing-database";

  static async getWriting(slug: string): Promise<WritingWork | null> {
    const mainPath = path.join(
      process.cwd(),
      this.WRITING_DIRECTORY,
      slug,
      "main.md",
    );
    const metadataPath = path.join(
      process.cwd(),
      this.WRITING_DIRECTORY,
      slug,
      "item-metadata.json",
    );

    try {
      await access(mainPath, fs.constants.F_OK);
    } catch {
      console.warn(`${mainPath} not found`);
      return null;
    }

    try {
      await access(metadataPath, fs.constants.F_OK);
    } catch {
      console.warn(`${metadataPath} not found`);
      return null;
    }

    const main = readFile(mainPath).then((res) => res.toString());
    const meta = readFile(metadataPath).then((res) =>
      JSON.parse(res.toString()),
    ) as Promise<WritingMetadata>;

    return {
      title: (await meta).title,
      subtitle: (await meta).subtitle,
      date: new Date((await meta).date),
      body: await main,
    };
  }
}
