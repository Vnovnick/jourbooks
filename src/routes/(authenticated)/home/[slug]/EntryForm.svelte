<script lang="ts">
  export let handleSubmit: (e: SubmitEvent) => void;
  export let entryTitle: string;
  export let entryContent: string;
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
    disabled={!entryTitle || !entryContent}>Save</button
  >
</form>
