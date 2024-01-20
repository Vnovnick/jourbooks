<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import type { Book } from "$lib/typesAndInterfaces";
  import {
    SubNavTab,
    setSubNavTabStyling,
    tabsConfig,
  } from "./BookViewDefinitions";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import axios from "axios";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import BookInfoDisplay from "./BookInfoDisplay.svelte";
  import JournalEntryTab from "./JournalEntryTab.svelte";
  import ReviewEntryTab from "./ReviewEntryTab.svelte";
  export let data;
  let subNav = SubNavTab.JOURNAL;

  const specificBookQuery = createQuery<Book>({
    queryKey: ["specificBook"],
    queryFn: () =>
      axios
        .get(
          `${expressServerURL}/v1/book/shelved/${data.slug}:${data.userData.id}`
        )
        .then((res) => res.data),
  });

  $: bookData = $specificBookQuery.isSuccess
    ? $specificBookQuery.data
    : undefined;
</script>

<div class="w-full flex flex-col px-5">
  {#if $specificBookQuery.isLoading}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if $specificBookQuery.isSuccess && !$specificBookQuery.isLoading && bookData}
    <BookInfoDisplay {bookData} />
    <div>
      <div class="flex mt-5 border-b border-black">
        {#each tabsConfig as tab}
          <button
            class={setSubNavTabStyling(subNav, tab.val)}
            on:click={() => {
              subNav = tab.val;
            }}>{tab.text}</button
          >
        {/each}
      </div>
      {#if subNav === SubNavTab.JOURNAL}
        <JournalEntryTab bookId={data.slug} userId={data.userData.id} />
      {/if}
      {#if subNav === SubNavTab.REVIEW}
        <ReviewEntryTab
          reviewData={bookData.review}
          bookId={data.slug}
          userId={data.userData.id}
        />
      {/if}
    </div>
  {/if}
</div>
