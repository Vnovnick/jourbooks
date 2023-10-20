<script>
  import { searchPlaceholders } from "$lib/browsebooksDefinitions";
  const placeholder =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];
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
  <input class="w-[600px] mx-auto h-9 mt-10 pl-2" {placeholder} />
</div>
