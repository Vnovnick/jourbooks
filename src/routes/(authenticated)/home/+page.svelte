<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="m-auto w-[1024px] bg-green-50 flex flex-col">
  <nav class="mx-auto flex w-4/5 gap-x-10">
    <a href="/home">Home</a>
    <a href="/browsebooks">Browse Books</a>
    <form action="?/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  </nav>
  <p class="text-5xl m-auto mt-10">
    Welcome to Jourbooks {data.username}!!!!!
  </p>
</div>
