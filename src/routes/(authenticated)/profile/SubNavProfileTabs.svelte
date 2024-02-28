<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { setProfileSubNavStyling, tabsConfig } from "./profileDefinitions";
</script>

<div class="flex mt-5 border-b border-black">
  {#each tabsConfig as tab}
    <button
      class={setProfileSubNavStyling($page.url.pathname, tab.goto)}
      on:click={() => {
        goto(tab.goto);
      }}>{tab.text}</button
    >
  {/each}
</div>
