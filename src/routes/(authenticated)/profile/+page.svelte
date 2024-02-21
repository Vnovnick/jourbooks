<script lang="ts">
  import { ShelfOptions } from "$lib/typesAndInterfaces";
  import type { Book } from "$lib/typesAndInterfaces";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import ShelvedBookSpine from "./ShelvedBookSpine.svelte";
  import {
    ProfileSubNavTab,
    getBooksByShelf,
    orderShelves,
  } from "./profileDefinitions";
  import SubNavProfileTabs from "./SubNavProfileTabs.svelte";
  export let data: PageData;
  let subNav = ProfileSubNavTab.BOOKSHELF;

  const { userData } = data;
  const { bookData } = data;
  const username: string = userData.username;
  let shelfWidth: number;
  let shelves: { text: string; shelf: Book[][] }[];

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
  <SubNavProfileTabs bind:subNav />
  {#if shelves}
    {#each shelves as category}
      <div
        class="w-full mt-2 mb-5 border-b border-black"
        bind:clientWidth={shelfWidth}
      >
        <p class="text-center text-lg mb-2">
          {category.text} ({category.shelf.flat().length})
        </p>
        <div>
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
</div>
