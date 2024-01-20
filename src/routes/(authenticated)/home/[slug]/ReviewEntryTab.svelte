<script lang="ts">
  import type { Review } from "$lib/typesAndInterfaces";
  import { primaryActionButton } from "$lib/standardStyles";
  import BookReviewEntry from "./BookReviewEntry.svelte";

  export let reviewData: Review;

  let newReviewTitle = "";
  let newReviewText = "";
  let showWriteReviewForm = false;
</script>

{#if !reviewData}
  <button
    class={`${primaryActionButton} my-3`}
    on:click={() => {
      showWriteReviewForm = !showWriteReviewForm;
    }}>{showWriteReviewForm ? "Cancel" : "Write a Review"}</button
  >
{/if}
{#if reviewData}
  <BookReviewEntry {reviewData} />
{/if}
