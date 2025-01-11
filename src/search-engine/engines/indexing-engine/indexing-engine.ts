import { SearchIndexer } from "@/search-engine/search-indexer";
import { existsSync, Stats } from "fs";
import { lstat, readdir, readFile } from "fs/promises";
import path from "path";
import { RetrievableItem } from "../shared/retrievable-item";

export class IndexingEngine {
  indexer: SearchIndexer;

  static readonly ACCEPTED_FILENAMES = ["page.tsx", "main.md"];
  static readonly ITEM_METADATA_FILENAME = "item-metadata.json";
  static readonly INDEXED_METADATA_FILEPATH = path.join(
    // process.cwd(),
    "src/search-engine/data",
    "metadata.json",
  );

  constructor(indexer: SearchIndexer) {
    this.indexer = indexer;
  }

  /**
   * Finds all retreivable items, indexes them to the search engine data folder
   */
  async indexAllItems(): Promise<void> {
    const items: RetrievableItem[] = [
      ...(await this.findAllItemsInDirectory(["writing-database"])),
      ...(await this.findAllItemsInDirectory(["src/app"])),
    ].sort((a, b) => (a.date < b.date ? 1 : -1));

    // assign IDs
    items.forEach((item, index) => (item.metadata.id = index));

    // register metadata / tokens
    await Promise.all(
      items.flatMap((item) => {
        return [
          this.indexer.metadataWriter.registerItemMetadata(item),
          this.indexer.lexiconWriter.indexDocumentTerms(item),
        ];
      }),
    );

    this.indexer.metadataWriter.writeMetadataFiles();
    this.indexer.lexiconWriter.writeLexicon();
  }

  /**
   * Searches for all files with the name METADATA_FILENAME, then
   * retrieves their associated location and metadata
   */
  private async findAllItemsInDirectory(
    subpath: string[],
  ): Promise<RetrievableItem[]> {
    const dirPath = path.join(
      // process.cwd(),
      ...subpath,
    );
    const directoryItems = await readdir(dirPath);

    // Determine whether any sub-directories are present
    const lstats = await Promise.all(
      directoryItems.map(async (item) => ({
        item,
        lstat: await lstat(
          path.join(
            // process.cwd(),
            ...subpath,
            item,
          ),
        ),
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
    } else if (IndexingEngine.ACCEPTED_FILENAMES.includes(fileName)) {
      const mainPath = path.join(
        // process.cwd(),
        ...directoryPath,
        fileName,
      );
      const configPath = path.join(
        // process.cwd(),
        ...directoryPath,
        IndexingEngine.ITEM_METADATA_FILENAME,
      );

      const configExists = existsSync(configPath);

      if (!configExists) {
        return [];
      }

      const mainFile = readFile(mainPath).then((file) => file.toString());
      const config = readFile(configPath).then((file) =>
        JSON.parse(file.toString()),
      );

      await Promise.all([mainFile, config]);

      return [
        RetrievableItem.constructFromConfig(
          await config,
          -1,
          path.join(...directoryPath, fileName),
        ),
      ];
    }

    return [];
  }
}
