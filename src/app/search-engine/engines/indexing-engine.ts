import { existsSync, Stats } from "fs";
import { lstat, readdir, readFile } from "fs/promises";
import path from "path";
import { SearchItemMetadata } from "../types";

const METADATA_FILENAME = "item-metadata.json";
const ACCEPTED_FILENAMES = ["page.tsx", "main.md"];

type RetreivableItem = {
  location: string;
  metadata: SearchItemMetadata;
};

export class IndexingEngine {
  static items: RetreivableItem[] = [];

  static async indexAllItems() {
    this.items = [
      ...(await this.findAllItemsInDirectory(["writing-database"])),
      ...(await this.findAllItemsInDirectory(["src/app"])),
    ];

    console.log("items", this.items);
  }

  /**
   * Searches for all files with the name METADATA_FILENAME, then
   * retrieves their associated location and metadata
   */
  private static async findAllItemsInDirectory(
    subpath: string[],
  ): Promise<RetreivableItem[]> {
    const dirPath = path.join(process.cwd(), ...subpath);
    const directoryItems = await readdir(dirPath);

    // Determine whether any sub-directories are present
    const lstats = await Promise.all(
      directoryItems.map(async (item) => ({
        item,
        lstat: await lstat(path.join(process.cwd(), ...subpath, item)),
      })),
    );

    return (
      await Promise.all(
        lstats.map(({ item, lstat }) =>
          this.findFilepath(subpath, item, lstat),
        ),
      )
    ).flat();
  }

  /**
   * Handles recursive iteration for one directory or file
   */
  private static async findFilepath(
    directoryPath: string[],
    fileName: string,
    lstat: Stats,
  ): Promise<RetreivableItem[]> {
    if (lstat.isDirectory()) {
      return await this.findAllItemsInDirectory([...directoryPath, fileName]);
    } else if (ACCEPTED_FILENAMES.includes(fileName)) {
      const metadataPath = path.join(
        process.cwd(),
        ...directoryPath,
        METADATA_FILENAME,
      );

      const metadataExists = existsSync(metadataPath);

      if (!metadataExists) {
        return [];
      }

      const metadataFile = await readFile(metadataPath);

      const metadata = JSON.parse(metadataFile.toString());

      return [
        {
          // intentionally do not join with process.cwd()
          location: path.join(...directoryPath, fileName),
          metadata,
        },
      ];
    }

    return [];
  }
}
