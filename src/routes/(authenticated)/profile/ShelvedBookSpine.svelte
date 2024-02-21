<script lang="ts">
  import type { Book } from "$lib/typesAndInterfaces";

  export let book: Book;
  let showImage = false;
  const randomSpineColors = [
    "bg-green-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-amber-100",
    "bg-orange-100",
  ];

  // temporary workaround to create a consistent character limit and predictable spine width
  const textLimit = 38;
</script>

<a
  href={`/home/${book.id}`}
  id={`profile-book-${book.id}`}
  class={`spine border border-black h-44 px-1.5 py-1 ${
    randomSpineColors[Math.floor(Math.random() * randomSpineColors.length)]
  }`}
  on:mouseover={() => {
    showImage = true;
  }}
  on:focus={() => {
    showImage = true;
  }}
  on:mouseleave={() => {
    showImage = false;
  }}
  on:blur={() => {
    showImage = false;
  }}
>
  {book.title.slice(0, textLimit) +
    (book.title.length > textLimit ? "..." : "")}
</a>
{#if showImage}
  {#if book.cover_key}
    <img
      src={`https://covers.openlibrary.org/b/olid/${book.cover_key}-M.jpg`}
      alt={`Cover for ${book.title}`}
      class="h-44 w-auto object-scale-down"
    />
  {:else}
    <div
      class="h-44 w-[112px] text-center flex border border-dashed border-black"
    >
      <p class="m-auto">No Image <br />Available</p>
    </div>
  {/if}
{/if}

<style>
  .spine {
    writing-mode: vertical-rl;
  }
</style>
