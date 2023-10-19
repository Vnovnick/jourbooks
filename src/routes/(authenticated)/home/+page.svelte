<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="m-auto w-[1024px] bg-green-50 flex flex-col">
  <nav class="mx-auto flex w-4/5 gap-x-10">
    <a href="/home">Home</a>
    <form action="?/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  </nav>
  <p class="text-2xl m-auto font-semibold">
    Welcome to Jourbooks {data.username}!!!!!
  </p>
</div>
