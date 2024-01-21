<script lang="ts">
  export let editTitle: string;
  export let editText: string;
  export let isEditing: boolean;
  export let originalText: string;
  export let originalTitle: string;
  export let onClickFunc: () => void;
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
      on:click={onClickFunc}
      disabled={(editText === originalText && editTitle === originalTitle) ||
        !editTitle ||
        !editText}>Save Edit</button
    >
    <button
      class="bg-black py-2 px-4 w-fit text-white mt-3"
      on:click={() => (isEditing = false)}>Cancel Edit</button
    >
  </div>
</form>
