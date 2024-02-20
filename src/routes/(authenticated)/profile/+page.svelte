<script lang="ts">
  import { ShelfOptions } from "$lib/typesAndInterfaces";
  import type { Book } from "$lib/typesAndInterfaces";
  import type { PageData } from "./$types";
  import ShelvedBookSpine from "./ShelvedBookSpine.svelte";
  export let data: PageData;

  const { userData } = data;
  const { bookData } = data;
  const username: string = userData.username;
  console.log(bookData);
  const reading = bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.CURRENTLY_READING
  );
  const read = bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.READ
  );
  const wantToRead = bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.WANT_TO_READ
  );
  const shelves = [
    { text: "Currently Reading", books: reading },
    { text: "Read", books: read },
    { text: "Want To Read", books: wantToRead },
  ];
  // TODO add vertical spine text and hover effect for shelf
</script>

<div class="flex flex-col pt-10 px-12">
  <div class="flex">
    <div class="w-36 h-36 bg-black rounded-full flex">
      <p class="text-white m-auto text-5xl">
        {username[0].toUpperCase()}{username[1].toUpperCase()}
      </p>
    </div>
    <div class="ml-10">
      <p class="font-semibold">{username}</p>
      <p>{userData.email}</p>
    </div>
  </div>
  <p class="text-2xl border-b border-black mt-2">
    Shelved Books: {bookData.length}
  </p>
  {#each shelves as shelf}
    <div class="w-full mt-2 border-b border-black">
      <p class="text-center text-lg mb-2">{shelf.text}</p>
      <div class="flex gap-x-0.5">
        {#each shelf.books as book}
          <ShelvedBookSpine {book} />
        {/each}
      </div>
    </div>
  {/each}
</div>
