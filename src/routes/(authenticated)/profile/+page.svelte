<script lang="ts">
  import type { PageData } from "./$types";
  import { ProfileSubNavTab } from "./profileDefinitions";
  import SubNavProfileTabs from "./SubNavProfileTabs.svelte";
  import ProfileBookShelf from "./ProfileBookShelf.svelte";
  import ProfilePostsView from "./ProfilePostsView.svelte";
  export let data: PageData;
  let subNav = ProfileSubNavTab.BOOKSHELF;

  const { userData } = data;
  const { bookData } = data;
  const { journalEntries } = data;
  console.log(journalEntries);
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
  <SubNavProfileTabs bind:subNav />
  {#if subNav === ProfileSubNavTab.BOOKSHELF}
    <ProfileBookShelf {bookData} />
  {/if}
  {#if subNav === ProfileSubNavTab.POSTS}
    <ProfilePostsView {bookData} {journalEntries} userId={userData.id} />
  {/if}
</div>
