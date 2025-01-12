import { RetrievableItem, RetrievableItemMetadata } from "./retrievable-item";

export class QueryResult {
  metadata: RetrievableItemMetadata;
  description: string;

  private constructor(item: RetrievableItem, description: string) {
    this.metadata = item.metadata;
    this.description = description;
  }

  static async construct(
    item: RetrievableItem,
    description: string,
  ): Promise<QueryResult> {
    return new QueryResult(item, description);
  }
}
