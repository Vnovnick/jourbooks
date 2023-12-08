<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";

  let isSaveOptionsOpen = false;
  export let book: any;
  export let userId: string;
  const markBookAsRead = () => {
    axios.post(`${expressServerURL}/v1/book/shelve_read/${userId}`, {
      title: book.title,
      yearPublished: book.first_publish_year ?? "",
      pageCount: book.number_of_pages_median ?? "",
      author: !!book.author_name?.length ? book.author_name[0] : "",
    });
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
  <div class="ml-auto mb-auto">
    <button type="button" class={primaryActionButton}>Save</button>
    {#if isSaveOptionsOpen}
      <button type="button">Mark as Read</button>
    {/if}
  </div>
</div>
