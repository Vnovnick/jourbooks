<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="flex flex-col">
  <!-- <NavBar userName={data.userData.username} /> -->
  <p class="text-5xl m-auto mt-10">
    Welcome to Jourbooks {data.userData.username}!!!!!
  </p>
</div>
