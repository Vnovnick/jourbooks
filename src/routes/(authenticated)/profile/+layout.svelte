<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import SubNavProfileTabs from "./SubNavProfileTabs.svelte";

  const { userData } = data;
  const username: string = userData.username;
</script>

<div class="flex flex-col pt-10 px-12">
  <div class="flex">
    <div class="w-36 h-36 bg-black rounded-full flex">
      <p class="text-white m-auto text-5xl">
        {username[0].toUpperCase()}{username[1].toUpperCase()}
      </p>
    </div>
    <div class="ml-10">
      <p class="font-semibold">{username}</p>
      <p>{userData.email}</p>
    </div>
  </div>
  <SubNavProfileTabs />
  <slot />
</div>
