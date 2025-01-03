import { RetrievableItem } from "@/search-engine/engines/shared/retrievable-item";
import { SearchResult } from "../search-result/search-result";

export const ResultList: React.FC<{ items: RetrievableItem[] }> = ({
  items,
}) => {
  return (
    <ul id="results">
      {items?.map((item) => (
        <SearchResult
          key={item.location}
          item={item}
          snippet={item.getDescription()}
        />
      ))}
    </ul>
  );
};
