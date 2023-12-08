<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import RatingsInput from "./RatingsInput.svelte";

  let isSaveOptionsOpen = false;
  let ratingsInputShown = false;
  // temp saved state to test
  let isSaved = false;
  let bookRating = 0;
  export let book: any;
  export let userId: string;
  const markBookAsRead = async (rating: number) => {
    const res = await axios.post(
      `http://localhost:3000/v1/book/shelve_read/${userId}`,
      {
        title: book.title,
        publicationYear: book.first_publish_year ?? "",
        pageCount: book.number_of_pages_median ?? "",
        author: !!book.author_name?.length ? book.author_name[0] : "",
        rating,
        olid: book.edition_key[0],
      }
    );
    console.log(res.data);

    if (res.status === 201) {
      isSaved = true;
    }
  };
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
  <div class="ml-auto mb-auto w-36 items-end flex flex-col">
    {#if isSaved}
      <div class={`!bg-green-800 ${primaryActionButton}`}>Saved</div>
    {:else}
      <button
        type="button"
        class={`w-16 ${primaryActionButton}`}
        on:click={() => {
          isSaveOptionsOpen = !isSaveOptionsOpen;
          ratingsInputShown = false;
        }}>{isSaveOptionsOpen ? "Cancel" : "Save"}</button
      >
    {/if}
    {#if isSaveOptionsOpen}
      <div
        class="flex flex-col border-black border bg-green-100/40 rounded-lg w-full mt-2 h-20"
      >
        {#if ratingsInputShown}
          <RatingsInput bind:bookRating {markBookAsRead} />
        {:else}
          <button
            type="button"
            class="m-auto border-black hover:bg-black hover:text-white rounded-lg px-3 py-1"
            on:click={() => {
              ratingsInputShown = true;
            }}>Mark as Read</button
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
