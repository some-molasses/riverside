import { SearchRetrievalEngine } from "@/search-engine/search-retrieval-engine";

export async function GET(request: Request) {
  const items = await new SearchRetrievalEngine().retrieveAllItems();

  return Response.json({ items });
}
