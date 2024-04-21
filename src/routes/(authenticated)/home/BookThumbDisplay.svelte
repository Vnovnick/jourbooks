<script lang="ts">
  import type { Book } from "$lib/typesAndInterfaces";

  export let books: Book[];
</script>

<div class="flex overflow-auto max-w-[900px] mx-auto gap-x-5 mt-5 pb-5">
  {#each books as book}
    <a href={`/home/${book.id}`} class="flex flex-col items-center text-center">
      {#if book.cover_key}
        <img
          loading="lazy"
          src={`https://covers.openlibrary.org/b/olid/${book.cover_key}-M.jpg`}
          alt={`Cover for ${book.title}`}
          class="h-[180px] w-36 object-scale-down"
        />
      {:else}
        <div
          class="h-[230px] w-[176px] text-center flex border border-dashed border-black"
        >
          <p class="m-auto">No Image <br />Available</p>
        </div>
      {/if}
      <p class="w-44 truncate">{book.title}</p>
      <p class="w-44 truncate">{book.author}</p>
    </a>
  {:else}
    <a href="/browsebooks" class="mx-auto text-xl hover:underline"
      >Shelve some books to populate this row</a
    >
  {/each}
</div>
