<script lang="ts">
  import { formatShelfOptionsEnumString } from "$lib/formattingFunctions";
  import type { ShelfOptions } from "$lib/typesAndInterfaces";
  import { inputShelfOptionsConfig } from "./BookViewDefinitions";

  export let handleSubmit: (e: SubmitEvent) => void;
  export let entryTitle: string;
  export let entryContent: string;
  export let entryPageNumber: number | undefined = undefined;
  export let entryShelfType: ShelfOptions | undefined = undefined;
  export let isReview: boolean = false;
  let isShelfDropOpen = false;
  let isSaveDisabled = true;

  $: isSaveDisabled = isReview
    ? !entryTitle || !entryContent
    : !entryTitle || !entryContent || typeof entryPageNumber !== "number";
</script>

<form class="flex flex-col mb-5" on:submit|preventDefault={handleSubmit}>
  <label for="entry-title">Title</label>
  <input
    bind:value={entryTitle}
    id="entry-title"
    name="title"
    class="border border-black"
    placeholder="Somthing Clever"
    required
  />
  {#if !isReview}
    <div class="flex mt-3 gap-x-3">
      <input
        bind:value={entryPageNumber}
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
            entryShelfType ? "text-black" : "text-black/50"
          }`}
          >{entryShelfType
            ? formatShelfOptionsEnumString(entryShelfType)
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
                  entryShelfType = shelfOption.value;
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
    bind:value={entryContent}
    name="entry-content"
    class="border border-black h-56 mt-3"
    placeholder="Your Thoughts..."
    required
  />
  <button
    type="submit"
    class="bg-black py-2 px-4 w-fit text-white mt-3 disabled:opacity-50"
    disabled={isSaveDisabled}>Save</button
  >
</form>
