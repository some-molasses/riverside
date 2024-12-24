import { RetrievedItem, SearchItemMetadata } from "@/app/search-engine/types";
import fs from "fs";
import { access, readFile } from "fs/promises";
import path from "path";

export class RetrievalEngine {
  static async retrieveItem(itempath: string): Promise<RetrievedItem | null> {
    const mainPath = path.join(process.cwd(), itempath, "main.md");
    const metadataPath = path.join(
      process.cwd(),
      itempath,
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
    ) as Promise<SearchItemMetadata>;

    return {
      title: (await meta).title,
      subtitle: (await meta).subtitle,
      date: new Date((await meta).date),
      body: await main,
    };
  }
}
