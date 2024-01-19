<script lang="ts">
  import type { JournalEntry } from "$lib/typesAndInterfaces";
  import { expressServerURL } from "$lib/endpointAssets";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import dayjs from "dayjs";
  import trash from "$lib/images/ctas/trash.svg";
  import edit from "$lib/images/ctas/edit.svg";
  import Modal from "$lib/uiComponents/Modal.svelte";

  export let post: JournalEntry;
  export let userId: string;
  export let slug: string;

  let isDeleteLoading = false;
  let isEditLoading = false;
  let showModal = false;
  let isEditing = false;
  let editTitle = post.title;
  let editText = post.text;
  const queryClient = useQueryClient();

  const deleteJournalEntry = createMutation({
    mutationFn: (postId: string) => {
      isDeleteLoading = true;
      return axios.delete(
        `${expressServerURL}/v1/book/shelved/journal/${slug}:${userId}:${postId}`
      );
    },
    onSuccess: () => {
      showModal = false;
    },
    onError: () => {
      isDeleteLoading = false;
      console.log("Error deleting post");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] }),
  });

  const editJournalEntry = createMutation({
    mutationFn: (postId: string) => {
      isEditLoading = true;
      return axios.patch(
        `${expressServerURL}/v1/book/shelved/journal/${postId}`,
        {
          title: editTitle,
          text: editText,
        }
      );
    },
    onSuccess: () => {
      isEditLoading = false;
      isEditing = false;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] }),
  });
</script>

<div class="py-6 border-t border-black">
  {#if isEditing}
    <form class="flex flex-col mb-5">
      <input
        bind:value={editTitle}
        id="edit-title"
        name="title"
        class="border border-black"
        placeholder="A slightly different title..."
        required
      />
      <textarea
        bind:value={editText}
        name="edit-content"
        class="border border-black h-44 mt-3"
        placeholder="Some Edited Thoughts..."
        required
      />
      <div class="flex gap-x-3">
        <button
          class="bg-black py-2 px-4 w-fit text-white mt-3 disabled:opacity-50"
          on:click={() => $editJournalEntry.mutate(post.id)}
          disabled={editText === post.text && editTitle === post.title}
          >Save Edit</button
        >
        <button
          class="bg-black py-2 px-4 w-fit text-white mt-3"
          on:click={() => (isEditing = false)}>Cancel Edit</button
        >
      </div>
    </form>
  {/if}
  {#if !isEditing}
    <p>{post.title}</p>
    <p>{post.text}</p>
    <div class="flex justify-between mt-2">
      <div class="flex text-sm">
        <em
          >created: {dayjs(Number(post.created_at)).format(
            "h:mm a MM/DD/YYYY"
          )}</em
        >
        {#if post.edited_at}
          <em
            >&nbsp; - last edited: {dayjs(Number(post.edited_at)).format(
              "h:mm a MM/DD/YYYY"
            )}</em
          >
        {/if}
      </div>
      <div class="flex gap-x-2">
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
      </div>
    </div>
  {/if}
</div>
<Modal bind:showModal closeText="Cancel">
  <p class="text-2xl text-center">
    Are you sure you want to delete this Journal Entry?
  </p>
  <div class="flex text-xl gap-x-5 my-4">
    {#if !isDeleteLoading}
      <button
        class={primaryActionButton}
        on:click={() => {
          $deleteJournalEntry.mutate(post.id);
        }}>Yes, delete this post.</button
      >
    {/if}
    {#if isDeleteLoading}
      <p>Loading...</p>
    {/if}
  </div>
</Modal>
