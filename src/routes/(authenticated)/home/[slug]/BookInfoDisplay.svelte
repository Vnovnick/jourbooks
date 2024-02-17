<script lang="ts">
  import type { Book } from "$lib/typesAndInterfaces";
  import { primaryActionButton } from "$lib/standardStyles";
  import {
    formatShelfOptionsEnumString,
    formatShelfOptionButton,
  } from "$lib/formattingFunctions";
  import CircleRatings from "$lib/uiComponents/CircleRatings.svelte";
  export let bookData: Book;
  export let olData: any;
</script>

<div class="flex mt-5">
  <img
    src={`https://covers.openlibrary.org/b/olid/${bookData?.cover_key}-L.jpg`}
    alt={`Cover for ${bookData.title}`}
    class="w-60 object-scale-down"
  />
  <div class="mt-5 mx-5 flex flex-col gap-y-1.5">
    <p class="text-3xl font-bold">{bookData?.title}</p>
    <p class="text-2xl">{bookData?.author}</p>
    <p>Page Count: {bookData.page_count}</p>
    <p>Published: {bookData.publication_year}</p>
    {#if bookData.rating}
      <div class="flex items-center gap-x-3">
        <p>Your Rating:</p>
        <CircleRatings rating={bookData.rating} />
      </div>
    {/if}
    <p
      class={`${primaryActionButton} w-fit ${formatShelfOptionButton(
        bookData.shelf_type
      )}`}
    >
      {formatShelfOptionsEnumString(bookData.shelf_type)}
    </p>
    {#if !olData}
      <p>Loading...</p>
    {/if}
    {#if olData}
      {#if olData.description}
        <p class="border-t border-black mt-2 pt-2">
          {olData.description.value || olData.description}
        </p>
      {:else}
        <p>No Description Data available</p>
      {/if}
    {/if}
  </div>
</div>
