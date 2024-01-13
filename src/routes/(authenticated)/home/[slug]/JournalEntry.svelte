<script lang="ts">
  import type { JournalEntry } from "$lib/typesAndInterfaces";
  import { expressServerURL } from "$lib/endpointAssets";
  import { createMutation } from "@tanstack/svelte-query";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import dayjs from "dayjs";
  import trash from "./trash.svg";
  import edit from "./edit.svg";
  import Modal from "$lib/uiComponents/Modal.svelte";

  export let post: JournalEntry;
  export let userId: string;
  export let slug: string;

  let showModal = false;

  const createBookJournalEntry = createMutation({
    mutationFn: (id: string) =>
      axios.delete(
        `${expressServerURL}/v1/book/shelved/post/${slug}:${userId}`,
        { data: id }
      ),
    // onSuccess: () => {
    //   $bookPostsQuery.refetch();
    // },
  });
</script>

<div class="py-6 border-t border-black">
  <p>{post.title}</p>
  <p>{post.text}</p>
  <div class="flex justify-between">
    <div class="flex">
      <em>{dayjs(Number(post.created_at)).format("h:mm a MM/DD/YYYY")}</em>
      {#if post.edited_at}
        <em
          >- last edited on: {dayjs(Number(post.edited_at)).format(
            "h:mm a MM/DD/YYYY"
          )}</em
        >
      {/if}
    </div>
    <div class="flex gap-x-2">
      <button type="button" on:click={() => (showModal = true)}
        ><img src={trash} alt="delete" class="w-6 h-6" /></button
      ><button type="button"
        ><img src={edit} alt="edit" class="w-6 h-6" /></button
      >
    </div>
  </div>
</div>
<Modal bind:showModal closeText="Cancel">
  <p class="text-2xl text-center">
    Are you sure you want to delete this Journal Entry?
  </p>
  <div class="flex text-xl gap-x-5 my-4">
    <button class={primaryActionButton}>Yes, delete this post.</button>
  </div>
</Modal>
