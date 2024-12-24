export type SearchItemMetadata = {
  title: string;
  subtitle?: string;
  date: string;
  thumbnail?: string;
};

export type RetrievedItem = Omit<SearchItemMetadata, "date"> & {
  date: Date;
  body: string;
};

export type RetreivableItem = {
  location: string;
  metadata: SearchItemMetadata;
};
