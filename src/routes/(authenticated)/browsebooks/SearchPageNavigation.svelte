<script lang="ts">
  export let isSearching: boolean;
  export let selectedPage: number;
  export let totalPages: number;
  export let form: any;
  export let containerClassName: string;
</script>

<div class={`flex mx-auto gap-x-5 mt-1 ${containerClassName}`}>
  <button
    class="hover:underline"
    disabled={isSearching}
    on:click={() => {
      if (selectedPage > 1) {
        selectedPage = 1;
        form.requestSubmit();
      }
    }}>First</button
  >
  |
  <button
    class="hover:underline"
    disabled={isSearching}
    on:click={() => {
      if (selectedPage > 1) {
        selectedPage = selectedPage - 1;
        form.requestSubmit();
      }
    }}>Previous</button
  >
  <p>
    {selectedPage}/{totalPages}
  </p>
  <button
    class="hover:underline"
    disabled={isSearching}
    on:click={() => {
      if (selectedPage < totalPages) {
        selectedPage = selectedPage + 1;
        form.requestSubmit();
      }
    }}>Next</button
  >
  |
  <button
    class="hover:underline"
    disabled={isSearching}
    on:click={() => {
      if (selectedPage < totalPages) {
        selectedPage = totalPages;
        form.requestSubmit();
      }
    }}>Last</button
  >
</div>
