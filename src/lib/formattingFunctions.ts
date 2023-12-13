import { ShelfOptions } from "./typesAndInterfaces";

export const formatShelfOptionsEnumString = (val: ShelfOptions) =>
  val
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

export const formatShelfOptionButton = (val: ShelfOptions) => {
  switch (val) {
    case ShelfOptions.CURRENTLY_READING:
      return "bg-blue-600";
    case ShelfOptions.READ:
      return "bg-green-700";
    case ShelfOptions.WANT_TO_READ:
      return "bg-sky-900 text-black";
    default:
      return "bg-amber-800";
  }
};
