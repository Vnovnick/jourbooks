<script lang="ts">
  import {
    ProfileSubNavTab,
    setProfileSubNavStyling,
    tabsConfig,
  } from "./profileDefinitions";

  export let subNav: ProfileSubNavTab;
</script>

<div class="flex mt-5 border-b border-black">
  {#each tabsConfig as tab}
    <button
      class={setProfileSubNavStyling(subNav, tab.val)}
      on:click={() => {
        subNav = tab.val;
      }}>{tab.text}</button
    >
  {/each}
</div>
