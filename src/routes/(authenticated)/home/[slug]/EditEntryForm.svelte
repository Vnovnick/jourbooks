<script lang="ts">
  import { formatShelfOptionsEnumString } from "$lib/formattingFunctions";
  import type { ShelfOptions } from "$lib/typesAndInterfaces";
  import { inputShelfOptionsConfig } from "./BookViewDefinitions";

  let isShelfDropOpen = false;
  export let editTitle: string;
  export let editText: string;
  export let isEditing: boolean;
  export let originalText: string;
  export let originalTitle: string;
  export let originalPageNumber: number | undefined = undefined;
  export let originalShelfType: ShelfOptions | undefined = undefined;
  export let onClickFunc: () => void;
  export let isReview = false;
  export let editPageNumber: number | undefined = undefined;
  export let editShelfType: ShelfOptions | undefined = undefined;

  let saveDisabled = true;

  $: saveDisabled =
    (editText === originalText &&
      editTitle === originalTitle &&
      originalPageNumber === editPageNumber &&
      originalShelfType === editShelfType) ||
    !editTitle ||
    !editText;
</script>

<form class="flex flex-col mb-5">
  <input
    bind:value={editTitle}
    id="edit-title"
    name="title"
    class="border border-black"
    placeholder="A slightly different title..."
    required
  />
  {#if !isReview}
    <div class="flex mt-3 gap-x-3">
      <input
        bind:value={editPageNumber}
        type="number"
        id="entry-page-number"
        name="page-number"
        class="border border-black w-44"
        placeholder="Page Number"
      />
      <div class="relative">
        <button
          type="button"
          on:click={() => {
            isShelfDropOpen = !isShelfDropOpen;
          }}
          class={`border border-black w-52 text-left bg-white ${
            editShelfType ? "text-black" : "text-black/50"
          }`}
          >{editShelfType
            ? formatShelfOptionsEnumString(editShelfType)
            : "Shelf Selection"}</button
        >
        {#if isShelfDropOpen}
          <div
            class="flex flex-col border-black border bg-green-100 rounded-lg w-full mt-1.5 py-2 min-h-[114px] absolute"
          >
            {#each inputShelfOptionsConfig as shelfOption}
              <button
                type="button"
                class="m-auto border-black hover:bg-black hover:text-white rounded-lg px-3 py-1"
                on:click={() => {
                  editShelfType = shelfOption.value;
                  isShelfDropOpen = false;
                }}>{shelfOption.text}</button
              >
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
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
      on:click|preventDefault={onClickFunc}
      disabled={saveDisabled}>Save Edit</button
    >
    <button
      class="bg-black py-2 px-4 w-fit text-white mt-3"
      on:click={() => (isEditing = false)}>Cancel Edit</button
    >
  </div>
</form>
