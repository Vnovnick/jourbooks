<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import type { Book } from "$lib/typesAndInterfaces";
  import CircleRatings from "$lib/uiComponents/CircleRatings.svelte";
  import {
    formatShelfOptionsEnumString,
    formatShelfOptionButton,
  } from "$lib/formattingFunctions";
  import { primaryActionButton } from "$lib/standardStyles";
  import { SubNavTab, setSubNavTabStyling } from "./BookViewDefinitions";
  import { createMutation, createQuery } from "@tanstack/svelte-query";
  import JournalEntryForm from "./JournalEntryForm.svelte";
  import axios from "axios";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import JournalEntry from "./JournalEntry.svelte";
  export let data;
  let entryTitle = "";
  let entryContent = "";
  let showNewEntryForm = false;
  let subNav = SubNavTab.JOURNAL;

  const bookPostsQuery = createQuery({
    queryKey: ["specificBookPosts"],
    queryFn: () =>
      axios
        .get(
          `${expressServerURL}/v1/book/shelved/book_posts/${data.slug}:${data.userData.id}`
        )
        .then((res) => res.data),
  });

  const createBookJournalEntry = createMutation({
    mutationFn: (postData: { title: string; text: string; userId: string }) =>
      axios.post(
        `${expressServerURL}/v1/book/shelved/post/${data.slug}`,
        postData
      ),
    onSuccess: () => {
      entryTitle = "";
      entryContent = "";
      $bookPostsQuery.refetch();
      showNewEntryForm = false;
    },
  });

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

  // createdat values coming back from the backend as strings???
  $: postsData = $bookPostsQuery.isSuccess
    ? $bookPostsQuery.data.sort((a: any, b: any) => b.createdat - a.createdat)
    : [];

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const body = {
      title: entryTitle,
      text: entryContent,
      userId: data.userData.id,
    };

    $createBookJournalEntry.mutate(body);
  };
</script>

<div class="w-full flex flex-col px-5">
  {#if $specificBookQuery.isLoading}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if $specificBookQuery.isSuccess && !$specificBookQuery.isLoading && bookData}
    <div class="flex mt-5">
      <img
        src={`https://covers.openlibrary.org/b/olid/${bookData?.cover_key}-L.jpg`}
        alt={`Cover for ${bookData.title}`}
        class="w-60 object-scale-down"
      />
      <div class="mt-5 mx-5">
        <p class="text-3xl font-bold">{bookData?.title}</p>
        <p class="text-2xl">{bookData?.author}</p>
        <p>{bookData.page_count}</p>
        <p>{bookData.publication_year}</p>
        {#if bookData.rating}
          <div class="flex items-center gap-x-3">
            <p>Your Rating:</p>
            <CircleRatings rating={bookData.rating} />
          </div>
        {/if}
        <p
          class={`${primaryActionButton} w-fit ${formatShelfOptionButton(
            bookData.shelf_type
          )}`}
        >
          {formatShelfOptionsEnumString(bookData.shelf_type)}
        </p>
      </div>
    </div>
    <div>
      <div class="flex mt-5 border-b border-black">
        <button
          class={setSubNavTabStyling(subNav, SubNavTab.JOURNAL)}
          on:click={() => {
            subNav = SubNavTab.JOURNAL;
          }}>Journal Entries</button
        >
        <button
          class={setSubNavTabStyling(subNav, SubNavTab.REVIEW)}
          on:click={() => {
            subNav = SubNavTab.REVIEW;
          }}>Your Review</button
        >
      </div>
      <div>
        <button
          on:click={() => {
            showNewEntryForm = !showNewEntryForm;
          }}
          >{showNewEntryForm ? "Cancel" : "Create a New Journal Entry"}</button
        >
      </div>
      {#if showNewEntryForm}
        <JournalEntryForm {handleSubmit} bind:entryContent bind:entryTitle />
      {/if}
      {#if $bookPostsQuery.isSuccess && !$bookPostsQuery.isLoading && postsData}
        {#each postsData as post}
          <JournalEntry {post} slug={data.slug} userId={data.userData.id} />
        {/each}
      {/if}
    </div>
  {/if}
</div>
