import { SearchRetriever } from "@/search-engine/search-retriever";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .filter((tag) => !!tag);

  const items = await new SearchRetriever().retrieveAllItems({ tags });

  return Response.json({ items });
}
