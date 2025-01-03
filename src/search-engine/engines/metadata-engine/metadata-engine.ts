import path from "path";

export class MetadataEngine {
  private static readonly METADATA_DIRECTORY_PATH = path.join(
    process.cwd(),
    "src/search-engine/data/metadata",
  );

  static readonly FILEPATHS = {
    DOC_LENGTHS: path.join(
      this.METADATA_DIRECTORY_PATH,
      "document-lengths.json",
    ),
    LEXICON: path.join(this.METADATA_DIRECTORY_PATH, "lexicon.json"),
    ID_TO_METADATA: path.join(
      this.METADATA_DIRECTORY_PATH,
      "id-to-metadata.json",
    ),
    INVERTED_INDEX: path.join(
      this.METADATA_DIRECTORY_PATH,
      "inverted_index.json",
    ),
  };
}
