<script lang="ts">
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";

  let bookSearch: string;
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  // need to remove whitespace from each individual word before joining
  const handleBookSearch = () => {
    const convertedSearch = bookSearch.trim().split(" ");
    // .map((s) => s.trim())
    // .join("+");
    console.log(convertedSearch);
  };
</script>

<div class="m-auto w-[1024px] bg-green-50 flex flex-col">
  <nav class="mx-auto flex w-4/5 gap-x-10">
    <a href="/home">Home</a>
    <a href="/browsebooks">Browse Books</a>
    <form action="?/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  </nav>
  <p class="text-5xl text-center mt-10">Browse Books</p>
  <div class="flex gap-x-2 items-center mt-10 justify-center">
    <input
      class="w-[600px] h-9 pl-2 border border-black"
      name="book-search"
      {placeholder}
      bind:value={bookSearch}
    />
    <button
      type="button"
      class="p-1.5 bg-black text-green-50 rounded-sm hover:bg-black h-fit"
      on:click={handleBookSearch}>Search</button
    >
  </div>
</div>
