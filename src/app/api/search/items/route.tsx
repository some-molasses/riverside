import { SearchRetriever } from "@/app/search-engine/search-retriever";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .filter((tag) => !!tag);

  const query = searchParams.get("q");

  // @todo don't re-initialize the retriever every time
  const items = await new SearchRetriever().query(query, { tags });

  return Response.json({ items });
}
