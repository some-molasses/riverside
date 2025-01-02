import { RetrievableItem } from "@/search-engine/types";
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
          snippet={item.description}
        />
      ))}
    </ul>
  );
};
