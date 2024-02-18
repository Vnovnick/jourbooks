<script lang="ts">
  export let data;
  import { page } from "$app/stores";
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import BookSearchEntry from "./BookSearchEntry.svelte";
  import type { Book } from "$lib/typesAndInterfaces";
  import { goto } from "$app/navigation";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import SearchPageNavigation from "./SearchPageNavigation.svelte";

  let isSearching = false;
  let form: any;
  let bookSearch: string;
  let convertedSearch = "";
  let selectedPage = 1;
  let searchResponse: any[] = [];
  let numResults: number;
  let bookSearchError: string | null = null;
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  const hasQueryParams = $page.url.searchParams.has("q");
  let totalPages = 1;

  // TODO add page param to search link
  const handleBookSearch = async (e: SubmitEvent) => {
    e.preventDefault();
    isSearching = true;
    searchResponse = [];
    const searchQuery = $page.url.searchParams.get("q");
    // const pageParam = $page.url.searchParams.get("page") ?? "1";
    if (hasQueryParams && searchQuery && !bookSearch) {
      convertedSearch = searchQuery;
      // if (pageParam) selectedPage = Number(pageParam);
    } else {
      convertedSearch = bookSearch
        .trim()
        .split(" ")
        .filter((s) => !!s.length)
        .join("+");
      const query = new URLSearchParams($page.url.searchParams.toString());
      query.set("q", convertedSearch);
      // query.set("page", selectedPage.toString());
      console.log("query params", query);
      goto(`?${query.toString()}`);
    }

    if (convertedSearch.length > 0) {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${convertedSearch}&page=${selectedPage}`
      );
      console.log(res.data);

      if (res.status === 200) {
        searchResponse = res.data.docs.map((doc: any) => {
          const docOlid = doc.key.slice(7);
          const matchingBook = data.bookData.find(
            (book: Book) => book.olid === docOlid
          );
          if (matchingBook) {
            doc["assigned_shelf"] = matchingBook.shelf_type;
          }
          return doc;
        });
        numResults = res.data.numFound;
      } else {
        bookSearchError = res.data;
        console.log(bookSearchError);
      }
    }
    isSearching = false;
  };

  $: if ($page.url.searchParams.get("q") && form) form.requestSubmit();
  $: totalPages = isNaN(Math.ceil(numResults / 100))
    ? 1
    : Math.ceil(numResults / 100);
  // TODO add a way to debounce pagination clicks to avoid multiple search queries
</script>

<div class="bg-green-50 flex flex-col overflow-auto">
  <p class="text-5xl text-center mt-10">Browse Books</p>
  <form
    class="flex gap-x-2 mt-10 mb-5 justify-center"
    on:submit={handleBookSearch}
    bind:this={form}
  >
    <input
      class="w-[600px] h-9 pl-2 border border-black"
      name="book-search"
      {placeholder}
      bind:value={bookSearch}
    />
    <button type="submit" class={primaryActionButton} disabled={!bookSearch}
      >Search</button
    >
  </form>
  <div
    class={`flex gap-x-4 mx-auto items-center ${
      !!searchResponse.length ? "" : "invisible"
    }`}
  >
    <p class="w-36">{numResults} Results</p>
    <button
      type="button"
      class={primaryActionButton}
      on:click={() => {
        searchResponse = [];
      }}>Clear Results</button
    >
  </div>
  {#if hasQueryParams}
    <SearchPageNavigation
      {totalPages}
      {selectedPage}
      {isSearching}
      {form}
      containerClassName="mt-1"
    />
  {/if}
  {#if isSearching}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if searchResponse.length > 0}
    <div class="min-h overflow-auto px-5 flex flex-col gap-y-3">
      {#each searchResponse as book}
        <BookSearchEntry {book} userId={data.userData.id} />
      {/each}
    </div>
  {/if}
  {#if hasQueryParams}
    <SearchPageNavigation
      {totalPages}
      {selectedPage}
      {isSearching}
      {form}
      containerClassName="my-5"
    />
  {/if}
</div>
