export interface ReadBooks {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  olid: string;
  page_count: number;
  rating: number;
}

export enum ShelfOptions {
  READ = "READ",
  WANT_TO_READ = "WANT_TO_READ",
  CURRENTLY_READING = "CURRENTLY_READING",
}
