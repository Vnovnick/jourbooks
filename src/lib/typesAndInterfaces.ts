export interface Book {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  olid: string;
  page_count: number;
  rating?: number;
  shelf_type: ShelfOptions;
  cover_key: string;
}

export enum ShelfOptions {
  READ = "READ",
  WANT_TO_READ = "WANT_TO_READ",
  CURRENTLY_READING = "CURRENTLY_READING",
}
