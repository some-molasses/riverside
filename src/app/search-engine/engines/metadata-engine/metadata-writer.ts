import { SearchIndexer } from "@/app/search-engine/search-indexer";

import { writeFileSync } from "fs";
import {
  RetrievableItem,
  RetrievableItemMetadata,
} from "../shared/retrievable-item";
import { MetadataEngine } from "./metadata-engine";

/**
 * Handles all metadata-writing operations required by indexing.
 */
export class MetadataWriter {
  indexer: SearchIndexer;

  metadataById: RetrievableItemMetadata[] = [];
  docLengthById: number[] = [];

  constructor(indexer: SearchIndexer) {
    this.indexer = indexer;
  }

  /**
   * Registers an item with the metadata writer.
   */
  registerItemMetadata(item: RetrievableItem) {
    this.metadataById.push(item.metadata);
    // this.docLengthById.push(document.tokens.length); // @todo track document lengths, tokenize, etc.
  }

  /**
   * Saves all document metadata currently being tracked to the disk.
   */
  writeMetadataFiles() {
    writeFileSync(
      MetadataEngine.FILEPATHS.ID_TO_METADATA,
      JSON.stringify(this.metadataById, undefined, 2),
    );

    writeFileSync(
      MetadataEngine.FILEPATHS.DOC_LENGTHS,
      JSON.stringify(this.docLengthById),
    );
  }
}
