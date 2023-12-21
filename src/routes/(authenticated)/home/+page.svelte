<script lang="ts">
  import { ShelfOptions, type Book } from "$lib/typesAndInterfaces";
  import type { PageData } from "./$types";
  import BookThumbDisplay from "./BookThumbDisplay.svelte";
  export let data: PageData;

  const currentlyReading = data.bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.CURRENTLY_READING
  );
  const readBooks = data.bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.READ
  );
  const wantToReadBooks = data.bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.WANT_TO_READ
  );
</script>

<div class="flex flex-col px-5 bg-green-50">
  <p class="text-5xl m-auto mt-10">
    Welcome to Jourbooks {data.userData.username}!!!!!
  </p>
  <div class="mt-12 flex flex-col gap-y-10">
    <div>
      <p class="text-3xl">Currently Reading</p>
      <BookThumbDisplay books={currentlyReading} />
    </div>
    {#if !!readBooks.length}
      <div>
        <p class="text-3xl">Read</p>
        <BookThumbDisplay books={readBooks} />
      </div>
    {/if}
    {#if !!wantToReadBooks.length}
      <div>
        <p class="text-3xl">Want to Read</p>
        <BookThumbDisplay books={wantToReadBooks} />
      </div>
    {/if}
  </div>
</div>
