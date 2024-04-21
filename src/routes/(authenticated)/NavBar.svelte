<script lang="ts">
  import { page } from "$app/stores";
  export let userName: string;
</script>

<nav class="mx-auto flex w-4/5 mt-3">
  <div class="flex gap-x-10 items-end">
    <a href="/home" class="text-lg font-semibold">Jourbooks</a>
    <a
      href="/home"
      class={$page.url.pathname.startsWith("/home") ? "underline" : ""}>Home</a
    >
    <a
      href="/browsebooks"
      class={$page.url.pathname.startsWith("/browsebooks") ? "underline" : ""}
      >Browse Books</a
    >
    <a
      href="/profile"
      class={$page.url.pathname.startsWith("/profile") ? "underline" : ""}
      >Profile</a
    >
  </div>
  <div class="ml-auto flex items-end gap-x-10">
    <form action="?/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
    <div class="text-base w-9 h-9 rounded-full bg-black flex">
      <p class="text-white m-auto">
        {userName[0].toUpperCase()}{userName[1].toUpperCase()}
      </p>
    </div>
  </div>
</nav>
