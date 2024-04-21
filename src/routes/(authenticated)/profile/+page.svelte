<script lang="ts">
  import { onMount } from "svelte";
  import ShelvedBookSpine from "./ShelvedBookSpine.svelte";
  import { getBooksByShelf, orderShelves } from "./profileDefinitions";
  import { ShelfOptions, type Book } from "$lib/typesAndInterfaces";
  let shelfWidth: number;
  let shelves: { text: string; shelf: Book[][] }[];
  export let data;

  const { bookData } = data;
  const reading = getBooksByShelf(bookData, ShelfOptions.CURRENTLY_READING);
  const read = getBooksByShelf(bookData, ShelfOptions.READ);
  const wantToRead = getBooksByShelf(bookData, ShelfOptions.WANT_TO_READ);

  onMount(() => {
    const limit = Math.ceil(shelfWidth! / 62);
    shelves = [
      {
        text: "Currently Reading",
        shelf: orderShelves(reading, limit),
      },
      { text: "Read", shelf: orderShelves(read, limit) },
      {
        text: "Want To Read",
        shelf: orderShelves(wantToRead, limit),
      },
    ];
  });
  $: if (shelfWidth) {
    const limit = Math.ceil(shelfWidth! / 62);
    shelves = [
      {
        text: "Currently Reading",
        shelf: orderShelves(reading, limit),
      },
      { text: "Read", shelf: orderShelves(read, limit) },
      {
        text: "Want To Read",
        shelf: orderShelves(wantToRead, limit),
      },
    ];
  }
</script>

{#if shelves}
  {#each shelves as category}
    <div
      class="w-full mt-2 mb-5 border-b border-black"
      bind:clientWidth={shelfWidth}
    >
      <p class="text-center text-lg mb-2">
        {category.text} ({category.shelf.flat().length})
      </p>
      <div class="min-h-[60px]">
        {#each category.shelf as books}
          <div class="flex gap-x-0.5">
            {#each books as book}
              <ShelvedBookSpine {book} />
            {/each}
          </div>
          <div class="grow border border-black h-4" />
        {/each}
      </div>
    </div>
  {/each}
{/if}
