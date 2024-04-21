<script lang="ts">
  import { ShelfOptions, type Book } from "$lib/typesAndInterfaces";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import BookThumbDisplay from "./BookThumbDisplay.svelte";
  import axios from "axios";
  import { expressServerURL } from "$lib/endpointAssets";
  export let data;

  const booksQuery = createQuery<Book[]>({
    queryKey: ["selfShelvedBooks"],
    queryFn: () =>
      axios
        .get(`${expressServerURL}/v1/book/shelved/all/${data.userData.id}`)
        .then((res) => res.data),
  });

  $: booksData = $booksQuery.isSuccess ? $booksQuery.data : [];

  const filterBooksByShelf = (queryArray: Book[], option: ShelfOptions) =>
    queryArray.filter((book: Book) => book.shelf_type === option);
</script>

<div class="flex flex-col px-5 bg-green-50">
  <p class="text-5xl m-auto mt-10">
    Welcome to Jourbooks {data.userData.username}!
  </p>
  {#if !$booksQuery.isLoading && $booksQuery.isSuccess}
    {#if booksData.length > 0}
      <div class="mt-12 flex flex-col gap-y-10 items-center">
        <p class="text-3xl">Currently Reading</p>
        <BookThumbDisplay
          books={filterBooksByShelf(booksData, ShelfOptions.CURRENTLY_READING)}
        />
        <p class="text-3xl">Read</p>
        <BookThumbDisplay
          books={filterBooksByShelf(booksData, ShelfOptions.READ)}
        />
        <p class="text-3xl">Want to Read</p>
        <BookThumbDisplay
          books={filterBooksByShelf(booksData, ShelfOptions.WANT_TO_READ)}
        />
      </div>
    {:else}
      <a
        href="/browsebooks"
        class="mx-auto text-2xl mt-44 bg-green-300 rounded-md p-1 hover:bg-black hover:text-white"
        >Shelve some books to get started!</a
      >
    {/if}
  {:else}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
</div>
