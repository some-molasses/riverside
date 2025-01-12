import { SearchRetriever } from "@/app/search-engine/search-retriever";

/**
 * Computers BM25 scores for ranking, whether that be document ranking or query-biased summary ranking
 */
export class BM25Computer {
  retriever: SearchRetriever;

  get k1() {
    return 1.2;
  }

  get b() {
    return 0.75;
  }

  constructor(retriever: SearchRetriever) {
    this.retriever = retriever;
  }

  // Returns the component of a document's BM25 sum relating to a particular term
  getBM25ComponentForDocument(
    documentId: number,
    termFrequency: number,
    documentsContainingTerm: number,
  ) {
    const K = this.getK(documentId);

    const tfPart = termFrequency / (K + termFrequency);

    const collectionSize = this.retriever.lexiconReader.collectionSize;

    // Math.log uses base e
    const idfPart = Math.log(
      (collectionSize - documentsContainingTerm + 0.5) /
        (documentsContainingTerm + 0.5),
    );

    return tfPart * idfPart;
  }

  /**
   * Returns K(i) = k_1((1 - b) + b( { dl_i } / {avdl} ))
   */
  private getK(documentId: number) {
    const documentLength =
      this.retriever.lexiconReader.getDocumentLength(documentId);
    const proportionalDocLength =
      documentLength / this.retriever.lexiconReader.averageDocumentLength;

    return this.k1 * (1 - this.b + this.b * proportionalDocLength);
  }
}
