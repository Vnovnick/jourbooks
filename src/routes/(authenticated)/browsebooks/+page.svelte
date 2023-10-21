<script lang="ts">
  import { enhance } from "$app/forms";
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";

  let bookSearch: string;
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  const handleBookSearch = (e: SubmitEvent) => {
    e.preventDefault();
    const convertedSearch = bookSearch
      .trim()
      .split(" ")
      .filter((s) => !!s.length)
      .join("+");
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
  <form
    class="flex gap-x-2 items-center mt-10 justify-center"
    on:submit={handleBookSearch}
  >
    <input
      class="w-[600px] h-9 pl-2 border border-black"
      name="book-search"
      {placeholder}
      bind:value={bookSearch}
    />
    <button
      type="submit"
      class="p-1.5 bg-black text-green-50 rounded-sm hover:bg-black h-fit"
      >Search</button
    >
  </form>
</div>
