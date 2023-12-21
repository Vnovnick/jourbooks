<script lang="ts">
  import NavBar from "./NavBar.svelte";
  export let data;
</script>

<div class="h-full mx-auto w-[1024px] bg-green-50">
  <NavBar userName={data.userData.username} />
  <slot />
</div>
