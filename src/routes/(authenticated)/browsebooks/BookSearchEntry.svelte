<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import RatingsInput from "./RatingsInput.svelte";
  import { ShelfOptions } from "$lib/typesAndInterfaces";
  import {
    formatShelfOptionButton,
    formatShelfOptionsEnumString,
  } from "$lib/formattingFunctions";

  let isSaveOptionsOpen = false;
  let ratingsInputShown = false;

  // temp saved state to test
  let tempSave = false;
  let bookRating = 0;
  let savedShelf: ShelfOptions;
  export let book: any;
  export let userId: string;
  const shelveBook = async (rating: number | null, shelfType: ShelfOptions) => {
    // TODO add a patch to same endpoint in order to update book relationship
    // TODO (additional reminder) handle duplicates in the backend
    const res = await axios.post(
      `${expressServerURL}/v1/book/shelve/${userId}`,
      {
        title: book.title,
        publicationYear: book.first_publish_year ?? "",
        pageCount: book.number_of_pages_median ?? "",
        author: !!book.author_name?.length ? book.author_name[0] : "",
        rating,
        shelfType,
        olid: book.key.slice(7),
        coverKey: book.cover_edition_key,
      }
    );
    console.log(res.data);

    if (res.status === 201) {
      tempSave = true;
      savedShelf = shelfType;
      ratingsInputShown = false;
      isSaveOptionsOpen = false;
    }
  };

  const shelfOptionConfig = [
    {
      text: "Read",
      value: ShelfOptions.READ,
      clickFunc: () => {
        ratingsInputShown = true;
      },
    },
    {
      text: "Currently Reading",
      value: ShelfOptions.CURRENTLY_READING,
      clickFunc: () => shelveBook(null, ShelfOptions.CURRENTLY_READING),
    },
    {
      text: "Want to Read",
      value: ShelfOptions.WANT_TO_READ,
      clickFunc: () => shelveBook(null, ShelfOptions.WANT_TO_READ),
    },
  ];
</script>

<div class="flex gap-x-4 items-center border-b border-black/50 pb-2">
  {#if book.cover_edition_key}
    <img
      loading="lazy"
      src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
      alt={`Cover for ${book.title}`}
      class="h-[230px] w-44 object-scale-down"
    />
  {:else}
    <div
      class="h-[230px] w-[176px] text-center flex border border-dashed border-black"
    >
      <p class="m-auto">No Image <br />Available</p>
    </div>
  {/if}
  <div class="flex flex-col justify-between h-[230px]">
    <div>
      <p>{book.title}</p>
      {#if !!book.author_name?.length}
        <p class="truncate w-60">{book.author_name[0]}</p>
      {/if}
      {#if book.first_publish_year}
        <p>{book.first_publish_year}</p>
      {/if}
      {#if book.number_of_pages_median}
        <p>Page Count: {book.number_of_pages_median}</p>
      {/if}
    </div>
    <div>
      {#if !!book.publisher?.length}
        <p>Published By: {book.publisher[0]}</p>
      {/if}
    </div>
  </div>
  <div class="ml-auto mb-auto w-44 items-end flex flex-col">
    {#if tempSave || book.assigned_shelf}
      <button
        type="button"
        class={`${formatShelfOptionButton(
          tempSave ? savedShelf : book.assigned_shelf
        )} ${primaryActionButton}`}
        on:click={() => {
          isSaveOptionsOpen = !isSaveOptionsOpen;
          ratingsInputShown = false;
        }}
      >
        {formatShelfOptionsEnumString(
          tempSave ? savedShelf : book.assigned_shelf
        )}
      </button>
    {:else}
      <button
        type="button"
        class={`w-28 ${primaryActionButton}`}
        on:click={() => {
          isSaveOptionsOpen = !isSaveOptionsOpen;
          ratingsInputShown = false;
        }}>{isSaveOptionsOpen ? "Cancel" : "Add to shelf"}</button
      >
    {/if}
    {#if isSaveOptionsOpen}
      <div
        class="flex flex-col border-black border bg-green-100/40 rounded-lg w-full mt-2 py-2 min-h-[114px]"
      >
        {#if ratingsInputShown}
          <RatingsInput bind:bookRating {shelveBook} />
        {:else}
          {#each shelfOptionConfig as shelfOption}
            <button
              type="button"
              class="m-auto border-black hover:bg-black hover:text-white rounded-lg px-3 py-1"
              on:click={shelfOption.clickFunc}>{shelfOption.text}</button
            >
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</div>
