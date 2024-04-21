import type { Book, ShelfOptions } from "$lib/typesAndInterfaces";

export const orderShelves = (shelvedBooks: Book[], shelfLimit: number) => {
  const arrays = [];
  let chunk = [];
  for (const book of shelvedBooks) {
    chunk.push(book);
    if (chunk.length === shelfLimit) {
      arrays.push(chunk);
      chunk = [];
    }
  }
  if (chunk.length) arrays.push(chunk);
  return arrays;
};

export enum ProfileSubNavTab {
  BOOKSHELF,
  POSTS,
  REVIEWS,
}

export const getBooksByShelf = (arr: Book[], shelf: ShelfOptions) =>
  arr.filter((book: Book) => book.shelf_type === shelf);

export const subNavigationTabs =
  "border-t border-r border-l border-b border-black border-b-transparent bg-green-50 ";

export const setProfileSubNavStyling = (path: string, buttonVal: string) => {
  return `px-3 py-2 box-content -mb-[1px] ${
    path === buttonVal ? "" : "border-transparent bg-transparent"
  } ${subNavigationTabs}`;
};

export const tabsConfig = [
  {
    text: "Bookshelf",
    val: ProfileSubNavTab.BOOKSHELF,
    goto: "/profile",
  },
  {
    text: "Posts",
    val: ProfileSubNavTab.POSTS,
    goto: "/profile/posts",
  },
  // {
  //   text: "Reviews",
  //   val: ProfileSubNavTab.REVIEWS,
  //   goto: "/profile/reviews",
  // },
];
