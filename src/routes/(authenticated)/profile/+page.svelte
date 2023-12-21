<script lang="ts">
  import NavBar from "../NavBar.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  const username: string = data.userData.username;
</script>

<div class="flex flex-col pl-12 pt-12">
  <div class="flex">
    <div class="w-36 h-36 bg-black rounded-full flex">
      <p class="text-white m-auto text-5xl">
        {username[0].toUpperCase()}{username[1].toUpperCase()}
      </p>
    </div>
    <div class="ml-10">
      <p class="font-semibold">{username}</p>
      <p>{data.userData.email}</p>
    </div>
  </div>
</div>
