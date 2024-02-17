<script lang="ts">
  import { SubNavTab } from "./BookViewDefinitions";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import BookInfoDisplay from "./BookInfoDisplay.svelte";
  import JournalEntryTab from "./JournalEntryTab.svelte";
  import ReviewEntryTab from "./ReviewEntryTab.svelte";
  import SubNavTabs from "./SubNavTabs.svelte";
  export let data;
  let subNav = SubNavTab.JOURNAL;
</script>

<div class="w-full flex flex-col px-5">
  {#if !data.bookData}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if data.bookData}
    <BookInfoDisplay bookData={data.bookData} olData={data.olData} />
    <SubNavTabs bind:subNav />
    {#if subNav === SubNavTab.JOURNAL}
      <JournalEntryTab bookId={data.slug} userId={data.userData.id} />
    {/if}
    {#if subNav === SubNavTab.REVIEW}
      <ReviewEntryTab
        reviewData={data.bookData.review}
        bookId={data.slug}
        userId={data.userData.id}
      />
    {/if}
  {/if}
</div>
