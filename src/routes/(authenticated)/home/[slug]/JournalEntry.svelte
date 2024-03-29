<script lang="ts">
  import type { JournalEntryType } from "$lib/typesAndInterfaces";
  import { expressServerURL } from "$lib/endpointAssets";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { primaryActionButton } from "$lib/standardStyles";
  import axios from "axios";
  import dayjs from "dayjs";
  import trash from "$lib/images/ctas/trash.svg";
  import edit from "$lib/images/ctas/edit.svg";
  import Modal from "$lib/uiComponents/Modal.svelte";
  import EditEntryForm from "./EditEntryForm.svelte";
  import {
    formatShelfOptionButton,
    formatShelfOptionsEnumString,
  } from "$lib/formattingFunctions";

  export let post: JournalEntryType;
  export let userId: string;
  export let slug: string;
  export let onEditSettled: () => void = () => {};

  let dialog: HTMLDialogElement;

  let isDeleteLoading = false;
  let isEditLoading = false;
  let showModal = false;
  let isEditing = false;
  let editTitle = post.title;
  let editText = post.text;
  let editPageNumber = post.page_number;
  let editShelfType = post.shelf_type;
  const queryClient = useQueryClient();

  const deleteJournalEntry = createMutation({
    mutationFn: (postId: string) => {
      isDeleteLoading = true;
      return axios.delete(
        `${expressServerURL}/v1/book/shelved/journal/${slug}:${userId}:${postId}`
      );
    },
    onSuccess: () => {
      isDeleteLoading = false;
      showModal = false;
      dialog.close();
    },
    onError: () => {
      isDeleteLoading = false;
      console.log("Error deleting post");
    },
    onSettled: () => {
      onEditSettled();
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] });
    },
  });

  const editJournalEntry = createMutation({
    mutationFn: (postId: string) => {
      isEditLoading = true;
      return axios.patch(
        `${expressServerURL}/v1/book/shelved/journal/${postId}`,
        {
          title: editTitle,
          text: editText,
          pageNumber: editPageNumber,
          shelfType: editShelfType,
        }
      );
    },
    onSuccess: () => {
      isEditLoading = false;
      isEditing = false;
    },
    onError: () => {
      isEditLoading = false;
      console.log("Error deleting journal entry");
    },
    onSettled: () => {
      showModal = false;
      onEditSettled();
      queryClient.invalidateQueries({ queryKey: ["specificBookPosts"] });
    },
  });
</script>

<div class="py-6 border-t border-black">
  {#if isEditing}
    <EditEntryForm
      bind:editText
      bind:editTitle
      bind:isEditing
      bind:editPageNumber
      bind:editShelfType
      originalText={post.text}
      originalTitle={post.title}
      originalPageNumber={post.page_number}
      originalShelfType={post.shelf_type}
      onClickFunc={() => $editJournalEntry.mutate(post.id)}
    />
  {/if}
  {#if !isEditing}
    <p class="mt-2 text-lg">{post.title}</p>
    <p class="w-[600px]">{post.text}</p>
    {#if post.page_number}
      <p class="text-base mt-2">
        Page No: {post.page_number}
      </p>
    {/if}
    {#if post.shelf_type}
      <p
        class={`${primaryActionButton} ${
          post.page_number ? "" : "mt-2"
        } w-fit ${formatShelfOptionButton(post.shelf_type)}`}
      >
        {formatShelfOptionsEnumString(post.shelf_type)}
      </p>
    {/if}
    <div class={`flex justify-between ${post.page_number ? "" : "mt-2"}`}>
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
<Modal bind:dialog bind:showModal closeText="Cancel">
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
