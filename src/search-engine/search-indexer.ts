import { existsSync, Stats } from "fs";
import { lstat, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { RetrievableItem } from "./types";

export class SearchIndexer {
  static readonly ACCEPTED_FILENAMES = ["page.tsx", "main.md"];
  static readonly ITEM_METADATA_FILENAME = "item-metadata.json";
  static readonly INDEXED_METADATA_FILEPATH = path.join(
    process.cwd(),
    "src/search-engine/data",
    "metadata.json",
  );

  /**
   * Finds all retreivable items, indexes them to the search engine data folder
   */
  async indexAllItems(): Promise<void> {
    const items = [
      ...(await this.findAllItemsInDirectory(["writing-database"])),
      ...(await this.findAllItemsInDirectory(["src/app"])),
    ];

    await writeFile(
      SearchIndexer.INDEXED_METADATA_FILEPATH,
      JSON.stringify(items),
    );
  }

  /**
   * Searches for all files with the name METADATA_FILENAME, then
   * retrieves their associated location and metadata
   */
  private async findAllItemsInDirectory(
    subpath: string[],
  ): Promise<RetrievableItem[]> {
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
  private async findFilepath(
    directoryPath: string[],
    fileName: string,
    lstat: Stats,
  ): Promise<RetrievableItem[]> {
    if (lstat.isDirectory()) {
      return await this.findAllItemsInDirectory([...directoryPath, fileName]);
    } else if (SearchIndexer.ACCEPTED_FILENAMES.includes(fileName)) {
      const metadataPath = path.join(
        process.cwd(),
        ...directoryPath,
        SearchIndexer.ITEM_METADATA_FILENAME,
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
