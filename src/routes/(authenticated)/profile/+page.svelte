<script lang="ts">
  import { ShelfOptions } from "$lib/typesAndInterfaces";
  import type { Book } from "$lib/typesAndInterfaces";
  import type { PageData } from "./$types";
  export let data: PageData;

  const { userData } = data;
  const { bookData } = data;
  const username: string = userData.username;
  console.log(bookData);
  const reading = bookData.filter(
    (book: Book) => book.shelf_type === ShelfOptions.CURRENTLY_READING
  );
  // TODO add vertical spine text and hover effect for shelf
</script>

<div class="flex flex-col pt-12 px-12">
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
  <div class="w-full mt-7">
    <p class="text-2xl border-b border-black">
      Shelved Books: {bookData.length}
    </p>
    <div class="flex mt-5"><p>Currently <br /> Reading:</p></div>
    <div class="flex">
      {#each reading as book}
        <div>{book.title}</div>
      {/each}
    </div>
  </div>
</div>
