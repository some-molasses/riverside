export type SearchItemMetadata = {
  title: string;
  subtitle?: string;
  date: string;
};

export type SearchItem = {
  title: string;
  subtitle?: string;
  date: Date;
  body: string;
};
