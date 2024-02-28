<script lang="ts">
  import { page } from "$app/stores";
  export let userName: string;
  let isProfileDropOpen: boolean = false;

  const handleDropOpen = () => {
    isProfileDropOpen = true;
    document.body.addEventListener("click", handleDropClose);
  };

  const handleDropClose = () => {
    isProfileDropOpen = false;
    document.body.removeEventListener("click", handleDropClose);
  };
</script>

<nav class="mx-auto flex w-4/5 mt-3">
  <div class="flex gap-x-10 items-end">
    <a href="/home" class="text-lg font-semibold">Jourbooks</a>
    <a href="/home" class={$page.url.pathname === "/home" ? "underline" : ""}
      >Home</a
    >
    <a
      href="/browsebooks"
      class={$page.url.pathname === "/browsebooks" ? "underline" : ""}
      >Browse Books</a
    >
    <a
      href="/profile"
      class={$page.url.pathname === "/profile" ? "underline" : ""}>Profile</a
    >
  </div>

  <div class="ml-auto relative w-44 items-end flex flex-col">
    <button
      type="button"
      class="text-base w-9 h-9 rounded-full bg-black flex"
      on:click|stopPropagation={handleDropOpen}
    >
      <p class="text-white m-auto">
        {userName[0].toUpperCase()}{userName[1].toUpperCase()}
      </p>
    </button>
    {#if isProfileDropOpen}
      <div
        class="border-black border flex flex-col gap-y-3 p-3 absolute w-full bg-green-50 mt-12"
        id="nav-dropdown"
      >
        <form action="?/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </div>
    {/if}
  </div>
</nav>
