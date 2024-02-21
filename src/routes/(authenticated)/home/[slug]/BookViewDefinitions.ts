import { ShelfOptions } from "$lib/typesAndInterfaces";

export const subNavigationTabs =
  "border-t border-r border-l border-b border-black border-b-transparent bg-green-50 ";

export enum SubNavTab {
  REVIEW,
  JOURNAL,
}
export const setSubNavTabStyling = (
  tabVal: SubNavTab,
  buttonVal: SubNavTab
) => {
  return `px-3 py-2 box-content -mb-[1px] ${
    tabVal === buttonVal ? "" : "border-transparent bg-transparent"
  } ${subNavigationTabs}`;
};

export const tabsConfig = [
  {
    val: SubNavTab.JOURNAL,
    text: "Journal Entries",
  },
  {
    val: SubNavTab.REVIEW,
    text: "Your Review",
  },
];

export const inputShelfOptionsConfig = [
  {
    text: "Read",
    value: ShelfOptions.READ,
  },
  {
    text: "Currently Reading",
    value: ShelfOptions.CURRENTLY_READING,
  },
  {
    text: "Want to Read",
    value: ShelfOptions.WANT_TO_READ,
  },
  {
    text: "Remove Shelf Selection",
    value: undefined,
  },
];
