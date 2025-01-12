import {
  RetrievalOptions,
  SearchRetriever,
} from "@/app/search-engine/search-retriever";
import { QueryResult } from "../shared/query-result";
import {
  RetrievableItem,
  RetrievableItemMetadata,
} from "../shared/retrievable-item";
import { DescriptionFactory } from "./description-factory";

export class OutputEngine {
  retriever: SearchRetriever;
  descriptionFactory: DescriptionFactory;

  constructor(retriever: SearchRetriever) {
    this.retriever = retriever;
    this.descriptionFactory = new DescriptionFactory(this);
  }

  async retrieveItems(
    ids: number[],
    query: string,
    options: RetrievalOptions,
  ): Promise<QueryResult[]> {
    const eligibleItems = await this.getMetadata(ids).then((metadatas) =>
      metadatas.filter((metadata) =>
        this.filterItemByMetadata(metadata, options),
      ),
    );

    const sorted =
      options.sort === "date"
        ? eligibleItems.sort((a, b) =>
            new Date(a.date) < new Date(b.date) ? 1 : -1,
          )
        : eligibleItems;

    const items = sorted.map((meta) =>
      RetrievableItem.constructFromMetadata(meta),
    );

    return await Promise.all(
      items.map(async (item) =>
        QueryResult.construct(
          item,
          await this.descriptionFactory.getDescription(item, query),
        ),
      ),
    );
  }

  private async getMetadata(ids: number[]): Promise<RetrievableItemMetadata[]> {
    return Promise.all(
      await Promise.all(
        ids.map(
          async (id) => await this.retriever.metadataReader.getMetadataById(id),
        ),
      ),
    );
  }

  private filterItemByMetadata(
    metadata: RetrievableItemMetadata,
    options: RetrievalOptions,
  ): boolean {
    if (options.tags.length === 0) {
      return true;
    }

    if (!metadata.tags) {
      return false;
    }

    for (const tag of options.tags) {
      if (metadata.tags.includes(tag)) {
        return true;
      }
    }

    return false;
  }
}
