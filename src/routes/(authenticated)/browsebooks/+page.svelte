<script lang="ts">
  export let data;
  import { page } from "$app/stores";
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import BookSearchEntry from "./BookSearchEntry.svelte";
  import type { Book } from "$lib/typesAndInterfaces";
  import { expressServerURL } from "$lib/endpointAssets";
  import { goto } from "$app/navigation";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";

  let isSearching = false;
  let form: any;
  let bookSearch: string;
  let convertedSearch = "";
  let searchResponse: any[] = [];
  let numResults: number;
  let bookSearchError: string | null = null;
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  const hasQueryParams = $page.url.searchParams.has("q");

  const handleBookSearch = async (e: SubmitEvent) => {
    e.preventDefault();
    isSearching = true;
    searchResponse = [];
    const searchQuery = $page.url.searchParams.get("q");
    if (hasQueryParams && searchQuery && !bookSearch) {
      convertedSearch = searchQuery;
    } else {
      convertedSearch = bookSearch
        .trim()
        .split(" ")
        .filter((s) => !!s.length)
        .join("+");
      const query = new URLSearchParams($page.url.searchParams.toString());
      query.set("q", convertedSearch);
      goto(`?${query.toString()}`);
    }

    if (convertedSearch.length > 0) {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${convertedSearch}`
      );
      console.log(res.data);

      if (res.status === 200) {
        const shelvedBooks = await axios.get(
          `${expressServerURL}/v1/book/shelved/all/${data.id}`
        );

        searchResponse = res.data.docs.map((doc: any) => {
          const docOlid = doc.key.slice(7);
          const matchingBook = shelvedBooks.data.find(
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
    <button type="submit" class={primaryActionButton}>Search</button>
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
  {#if isSearching}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if searchResponse.length > 0}
    <div class="min-h overflow-auto px-5 flex flex-col gap-y-3">
      {#each searchResponse as book}
        <BookSearchEntry {book} userId={data.id} />
      {/each}
    </div>
  {/if}
</div>
