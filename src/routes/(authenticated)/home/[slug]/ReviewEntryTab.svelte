<script lang="ts">
  import type { Review } from "$lib/typesAndInterfaces";
  import { primaryActionButton } from "$lib/standardStyles";
  import BookReviewEntry from "./BookReviewEntry.svelte";
  import EntryForm from "./EntryForm.svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import axios from "axios";
  import { expressServerURL } from "$lib/endpointAssets";

  export let reviewData: Review;
  export let bookId: string;
  export let userId: string;

  let newReviewTitle = "";
  let newReviewText = "";
  let showWriteReviewForm = false;

  const queryClient = useQueryClient();

  const createBookReview = createMutation({
    mutationFn: (postData: { title: string; text: string; userId: string }) =>
      axios.post(
        `${expressServerURL}/v1/book/shelved/review/${bookId}`,
        postData
      ),
    onSuccess: () => {
      newReviewTitle = "";
      newReviewText = "";
      showWriteReviewForm = false;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["specificBook"] }),
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const body = {
      title: newReviewTitle,
      text: newReviewText,
      userId,
    };

    $createBookReview.mutate(body);
  };
</script>

{#if !reviewData}
  <button
    class={`${primaryActionButton} my-3`}
    on:click={() => {
      showWriteReviewForm = !showWriteReviewForm;
    }}>{showWriteReviewForm ? "Cancel" : "Write a Review"}</button
  >
{/if}
{#if showWriteReviewForm}
  <EntryForm
    {handleSubmit}
    bind:entryContent={newReviewText}
    bind:entryTitle={newReviewTitle}
  />
{/if}
{#if reviewData}
  <BookReviewEntry {reviewData} />
{/if}
