<script lang="ts">
  import axios from "axios";
  import dayjs from "dayjs";
  import type { Review } from "$lib/typesAndInterfaces";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { expressServerURL } from "$lib/endpointAssets";
  import { primaryActionButton } from "$lib/standardStyles";
  import trash from "$lib/images/ctas/trash.svg";
  import edit from "$lib/images/ctas/edit.svg";
  import EditEntryForm from "./EditEntryForm.svelte";
  import Modal from "$lib/uiComponents/Modal.svelte";

  export let reviewData: Review;

  let dialog: HTMLDialogElement;

  let showModal = false;
  let editTitle = reviewData.title;
  let editText = reviewData.text;
  let isEditing = false;
  let isEditLoading = false;
  let isDeleteLoading = false;
  const queryClient = useQueryClient();

  const editReview = createMutation({
    mutationFn: (reviewId: string) => {
      isEditLoading = true;
      return axios.patch(
        `${expressServerURL}/v1/book/shelved/review/${reviewId}`,
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
      queryClient.invalidateQueries({ queryKey: ["specificBook"] }),
  });
</script>

<div class="mt-5">
  {#if isEditing}
    <EditEntryForm
      bind:editText
      bind:editTitle
      bind:isEditing
      originalText={reviewData.text}
      originalTitle={reviewData.title}
      onClickFunc={() => $editReview.mutate(reviewData.id)}
    />
  {/if}
  {#if !isEditing}
    <p>{reviewData.title}</p>
    <p>{reviewData.text}</p>
    <div class="flex justify-between mt-2">
      <div class="flex text-sm">
        <em
          >created: {dayjs(Number(reviewData.created_at)).format(
            "h:mm a MM/DD/YYYY"
          )}</em
        >
        {#if reviewData.edited_at}
          <em
            >&nbsp; - last edited: {dayjs(Number(reviewData.edited_at)).format(
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
            editText = reviewData.text;
            editTitle = reviewData.title;
            isEditing = true;
          }}><img src={edit} alt="edit" class="w-6 h-6" /></button
        >
      </div>
    </div>
  {/if}
</div>
<Modal bind:dialog bind:showModal closeText="Cancel">
  <p class="text-2xl text-center">
    Are you sure you want to delete this Review?
  </p>
  <div class="flex text-xl gap-x-5 my-4">
    {#if !isDeleteLoading}
      <button
        class={primaryActionButton}
        on:click={() => console.log("delete me")}
        >Yes, delete this review.</button
      >
    {/if}
    {#if isDeleteLoading}
      <p>Loading...</p>
    {/if}
  </div>
</Modal>
