<script lang="ts">
  export let userName: string;
  let isProfileDropOpen: boolean = false;
</script>

<nav class="mx-auto flex w-4/5 mt-3">
  <div class="flex gap-x-10 items-end">
    <a href="/home" class="text-lg font-semibold">Jourbooks</a>
    <a href="/home">Home</a>
    <a href="/browsebooks">Browse Books</a>
  </div>
  <div class="ml-auto relative w-44 items-end flex flex-col">
    <button
      type="button"
      class="text-base w-9 h-9 rounded-full bg-black flex"
      on:click={() => {
        isProfileDropOpen = !isProfileDropOpen;
      }}
    >
      <p class="text-white m-auto">
        {userName[0].toUpperCase()}{userName[1].toUpperCase()}
      </p>
    </button>
    {#if isProfileDropOpen}
      <div
        class="border-black border flex flex-col gap-y-3 p-3 absolute w-full bg-green-50 mt-12"
      >
        <a
          href="/profile"
          on:click={() => {
            isProfileDropOpen = false;
          }}>Profile</a
        >
        <form action="?/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </div>
    {/if}
  </div>
</nav>
