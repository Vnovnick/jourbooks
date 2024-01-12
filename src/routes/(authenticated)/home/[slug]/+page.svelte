<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import type { Book } from "$lib/typesAndInterfaces";
  import CircleRatings from "$lib/uiComponents/CircleRatings.svelte";
  import { createMutation, createQuery } from "@tanstack/svelte-query";
  import axios from "axios";
  import dayjs from "dayjs";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  export let data;
  let entryTitle: string;
  let entryContent: string;
  let showNewEntryForm = false;

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
      console.log("mutation success");
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

  console.log($bookPostsQuery.data);
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
        <p>{bookData?.page_count}</p>
        <p>{bookData?.publication_year}</p>
        {#if bookData?.rating}
          <div class="flex items-center gap-x-3">
            <p>Your Rating:</p>
            <CircleRatings rating={bookData.rating} />
          </div>
        {/if}
      </div>
    </div>
    <div>
      <div>
        <p class="font-semibold text-xl mt-5">Jour Entries</p>
        <button
          on:click={() => {
            showNewEntryForm = !showNewEntryForm;
          }}
          >{showNewEntryForm ? "Cancel" : "Create a New Journal Entry"}</button
        >
      </div>
      {#if showNewEntryForm}
        <form class="flex flex-col mb-5" on:submit={handleSubmit}>
          <label for="entry-title">Title</label>
          <input
            bind:value={entryTitle}
            id="entry-title"
            name="title"
            class="border border-black"
            placeholder="Somthing Clever"
            required
          />
          <textarea
            bind:value={entryContent}
            name="entry-content"
            class="border border-black h-56 mt-3"
            placeholder="Your Thoughts..."
            required
          />
          <button class="bg-black py-2 px-4 w-fit text-white mt-3">Save</button>
        </form>
      {/if}
      {#if $bookPostsQuery.isSuccess && !$bookPostsQuery.isLoading && postsData}
        {#each postsData as post}
          <div class="py-6 border-t border-black">
            <p>{post.title}</p>
            <p>{post.text}</p>
            <em>{dayjs(Number(post.createdat)).format("h:mm a MM/DD/YYYY")}</em>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
