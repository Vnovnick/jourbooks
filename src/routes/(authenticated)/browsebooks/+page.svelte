<script lang="ts">
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import BookSearchEntry from "./BookSearchEntry.svelte";

  let bookSearch: string;
  let searchResponse: any[] = [];
  let numResults: number;
  let bookSearchError: string | null = null;
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  const handleBookSearch = async (e: SubmitEvent) => {
    e.preventDefault();
    searchResponse = [];
    const convertedSearch = bookSearch
      .trim()
      .split(" ")
      .filter((s) => !!s.length)
      .join("+");

    if (convertedSearch.length > 0) {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${convertedSearch}`
      );
      console.log(res.data);

      if (res.status === 200) {
        searchResponse = res.data.docs;
        numResults = res.data.numFound;
      } else {
        bookSearchError = res.data;
        console.log(bookSearchError);
      }
    }
  };
  // scroll pushing middle slot over; find a way to fix the height or something'
</script>

<div class="m-auto w-[1024px] bg-green-50 flex flex-col overflow-auto">
  <nav class="mx-auto flex w-4/5 gap-x-10">
    <a href="/home">Home</a>
    <a href="/browsebooks">Browse Books</a>
    <form action="?/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  </nav>
  <p class="text-5xl text-center mt-10">Browse Books</p>
  <form
    class="flex gap-x-2 mt-10 mb-5 justify-center"
    on:submit={handleBookSearch}
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
  {#if searchResponse.length > 0}
    <div class="min-h overflow-auto px-5 flex flex-col gap-y-3">
      {#each searchResponse as book}
        <BookSearchEntry {book} />
      {/each}
    </div>
  {/if}
</div>
