<script lang="ts">
  import { ShelfOptions } from "$lib/typesAndInterfaces";

  export let bookRating: number;
  export let shelveBook: (
    rating: number | null,
    shelfType: ShelfOptions
  ) => void;
  console.log([...Array(6).keys()].slice(1));
</script>

<div class="flex gap-x-1 justify-center m-auto">
  {#each [...Array(6).keys()].slice(1) as num}
    <button
      class="w-5 h-5 rounded-md border border-black group flex"
      on:click={() => {
        shelveBook(num, ShelfOptions.READ);
      }}
    >
      <div
        class={`m-auto w-4 h-4 rounded-md ${
          num <= bookRating ? "bg-black" : "group-hover:bg-black"
        }`}
      />
    </button>
  {/each}
</div>
