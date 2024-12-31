export type SearchItemMetadata = {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  thumbnail?: string;
};

export type RetrievedItem = Omit<SearchItemMetadata, "date"> & {
  date: Date;
  body: string;
};

export type RetrievableItem = {
  location: string;
  metadata: SearchItemMetadata;
};
