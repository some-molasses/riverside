import { QueryResult } from "@/search-engine/engines/shared/query-result";
import { SearchResult } from "../search-result/search-result";

export const ResultList: React.FC<{ items: QueryResult[] }> = ({ items }) => {
  return (
    <ul id="results">
      {items?.map((item) => (
        <SearchResult key={item.metadata.id} item={item} />
      ))}
    </ul>
  );
};
