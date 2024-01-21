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
  review: Review;
}

export interface Review {
  id: string;
  title: string;
  text: string;
  created_at: string;
  edited_at: string;
}

export enum ShelfOptions {
  READ = "READ",
  WANT_TO_READ = "WANT_TO_READ",
  CURRENTLY_READING = "CURRENTLY_READING",
}

export interface JournalEntry {
  created_at: string | number;
  edited_at: string | number;
  id: string;
  title: string;
  text: string;
}
