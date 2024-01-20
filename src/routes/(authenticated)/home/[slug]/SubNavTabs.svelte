<script lang="ts">
  import type { SubNavTab } from "./BookViewDefinitions";

  export let subNav: SubNavTab;
  import { setSubNavTabStyling, tabsConfig } from "./BookViewDefinitions";
</script>

<div class="flex mt-5 border-b border-black">
  {#each tabsConfig as tab}
    <button
      class={setSubNavTabStyling(subNav, tab.val)}
      on:click={() => {
        subNav = tab.val;
      }}>{tab.text}</button
    >
  {/each}
</div>
