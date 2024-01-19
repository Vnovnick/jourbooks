<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import type { Book } from "$lib/typesAndInterfaces";
  import { primaryActionButton } from "$lib/standardStyles";
  import { SubNavTab, setSubNavTabStyling } from "./BookViewDefinitions";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";
  import JournalEntryForm from "./JournalEntryForm.svelte";
  import axios from "axios";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  import JournalEntry from "./JournalEntry.svelte";
  import BookInfoDisplay from "./BookInfoDisplay.svelte";
  import dayjs from "dayjs";
  export let data;
  let entryTitle = "";
  let entryContent = "";
  let newReviewTitle = "";
  let newReviewText = "";
  let showNewEntryForm = false;
  let showWriteReviewFrom = false;
  let subNav = SubNavTab.JOURNAL;

  const queryClient = useQueryClient();

  const bookPostsQuery = createQuery({
    queryKey: ["specificBookPosts"],
    queryFn: () =>
      axios
        .get(
          `${expressServerURL}/v1/book/shelved/journal/${data.slug}:${data.userData.id}`
        )
        .then((res) => res.data),
  });

  const createBookJournalEntry = createMutation({
    mutationFn: (postData: { title: string; text: string; userId: string }) =>
      axios.post(
        `${expressServerURL}/v1/book/shelved/journal/${data.slug}`,
        postData
      ),
    onSuccess: () => {
      entryTitle = "";
      entryContent = "";
      showNewEntryForm = false;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] }),
  });

  // TODO finish mutation and create a new Review form
  // const createBookReview = createMutation({
  //   mutationFn: (postData: { title: string; text: string; userId: string }) =>
  //     axios.post(
  //       `${expressServerURL}/v1/book/shelved/review/${data.slug}`,
  //       postData
  //     ),
  //   onSuccess: () => {
  //     newReviewTitle = "";
  //     newReviewText = "";
  //     showWriteReviewFrom = false;
  //   },
  //   onSettled: () =>
  //     queryClient.invalidateQueries({ queryKey: ["specificBook"] }),
  // });

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
    ? $bookPostsQuery.data.sort(
        (a: any, b: any) => Number(b.created_at) - Number(a.created_at)
      )
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
    <BookInfoDisplay {bookData} />
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
      {#if subNav === SubNavTab.JOURNAL}
        <button
          class={`${primaryActionButton} my-3`}
          on:click={() => {
            showNewEntryForm = !showNewEntryForm;
          }}
          >{showNewEntryForm ? "Cancel" : "Create a New Journal Entry"}</button
        >
        {#if showNewEntryForm}
          <JournalEntryForm {handleSubmit} bind:entryContent bind:entryTitle />
        {/if}
        {#if $bookPostsQuery.isSuccess && !$bookPostsQuery.isLoading && postsData}
          {#each postsData as post}
            <JournalEntry {post} slug={data.slug} userId={data.userData.id} />
          {/each}
        {/if}
      {/if}
      {#if subNav === SubNavTab.REVIEW}
        {#if !bookData.review}
          <button
            class={`${primaryActionButton} my-3`}
            on:click={() => {
              showWriteReviewFrom = !showWriteReviewFrom;
            }}>{showNewEntryForm ? "Cancel" : "Write a Review"}</button
          >
        {/if}
        {#if bookData.review}
          <div>
            <p>{bookData.review.title}</p>
            <p>{bookData.review.text}</p>
            <div class="flex justify-between mt-2">
              <div class="flex text-sm">
                <em
                  >created: {dayjs(Number(bookData.review.created_at)).format(
                    "h:mm a MM/DD/YYYY"
                  )}</em
                >
                {#if bookData.review.edited_at}
                  <em
                    >&nbsp; - last edited: {dayjs(
                      Number(bookData.review.edited_at)
                    ).format("h:mm a MM/DD/YYYY")}</em
                  >
                {/if}
              </div>
              <!-- <div class="flex gap-x-2">
              <button type="button" on:click={() => (showModal = true)}
                ><img src={trash} alt="delete" class="w-6 h-6" /></button
              ><button
                type="button"
                on:click={() => {
                  editText = post.text;
                  editTitle = post.title;
                  isEditing = true;
                }}><img src={edit} alt="edit" class="w-6 h-6" /></button
              >
            </div> -->
            </div>
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>
