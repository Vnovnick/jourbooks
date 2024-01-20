<script lang="ts">
  import type { Review } from "$lib/typesAndInterfaces";
  import dayjs from "dayjs";

  export let reviewData: Review;
</script>

<div class="mt-5">
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
