<script lang="ts">
  import JournalEntry from "./JournalEntry.svelte";
  import { primaryActionButton } from "$lib/standardStyles";
  import { expressServerURL } from "$lib/endpointAssets";
  import axios from "axios";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";
  import EntryForm from "./EntryForm.svelte";
  import type { ShelfOptions } from "$lib/typesAndInterfaces";

  export let bookId: string;
  export let userId: string;

  let showNewEntryForm = false;
  let entryTitle = "";
  let entryContent = "";
  let entryPageNumber: number | undefined = undefined;
  let entryShelfType: ShelfOptions | undefined = undefined;
  const queryClient = useQueryClient();

  const bookPostsQuery = createQuery({
    queryKey: ["specificBookPosts"],
    queryFn: () =>
      axios
        .get(`${expressServerURL}/v1/book/shelved/journal/${bookId}:${userId}`)
        .then((res) => res.data),
  });

  const createBookJournalEntry = createMutation({
    mutationFn: (postData: { title: string; text: string; userId: string }) =>
      axios.post(
        `${expressServerURL}/v1/book/shelved/journal/${bookId}`,
        postData
      ),
    onSuccess: () => {
      entryTitle = "";
      entryContent = "";
      entryPageNumber = undefined;
      entryShelfType = undefined;
      showNewEntryForm = false;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] }),
  });

  // createdat values coming back from the backend as strings???
  $: postsData = $bookPostsQuery.isSuccess
    ? $bookPostsQuery.data.sort(
        (a: any, b: any) => Number(b.created_at) - Number(a.created_at)
      )
    : [];

  const handleSubmit = () => {
    const body = {
      title: entryTitle,
      text: entryContent,
      userId,
      pageNumber: entryPageNumber,
      shelfType: entryShelfType,
    };
    $createBookJournalEntry.mutate(body);
  };
</script>

<button
  class={`${primaryActionButton} my-3 w-fit`}
  on:click={() => {
    showNewEntryForm = !showNewEntryForm;
  }}>{showNewEntryForm ? "Cancel" : "Create a New Journal Entry"}</button
>
{#if showNewEntryForm}
  <EntryForm
    {handleSubmit}
    bind:entryContent
    bind:entryTitle
    bind:entryPageNumber
    bind:entryShelfType
  />
{/if}
{#if $bookPostsQuery.isSuccess && !$bookPostsQuery.isLoading && postsData}
  {#each postsData as post}
    <JournalEntry {post} slug={bookId} {userId} />
  {/each}
{/if}
