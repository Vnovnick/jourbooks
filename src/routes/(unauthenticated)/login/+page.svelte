<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let form;
  let loginEmail: string;
  let loginPassword: string;
  const loginInputs = "w-[300px] rounded-md h-10 pl-2 border border-black";
  const formMessages = "w-[450px] m-auto rounded-md p-1 text-left";
  const buttonStyling =
    "bg-green-200 rounded-md p-1 hover:bg-black hover:text-white";
</script>

<div
  class="bg-green-50 w-[1024px] h-[400px] m-auto flex flex-col justify-between relative items-center"
>
  <form
    class="w-[550px] flex flex-col gap-y-4 m-auto"
    method="post"
    action="?/login"
    use:enhance
  >
    <p class="text-xl font-semibold text-center">Welcome to Jourbooks</p>
    <div class="w-4/5 mx-auto justify-between flex items-center">
      <p>Email:</p>
      <input
        class={loginInputs}
        type="text"
        name="loginEmail"
        bind:value={loginEmail}
      />
    </div>
    <div class="w-4/5 mx-auto justify-between flex items-center">
      <p>Password:</p>
      <input
        class={loginInputs}
        type="password"
        name="loginPassword"
        bind:value={loginPassword}
      />
    </div>
    <div class="flex mx-auto gap-5 text-sm">
      <button class={buttonStyling} type="submit">Login</button>
      <button class={buttonStyling} on:click={() => goto("/register")}
        >Sign Up</button
      >
      <button class={buttonStyling} on:click={() => goto("/")}>Cancel</button>
    </div>
  </form>
  <div class="flex w-[550px] absolute bottom-2">
    {#if form?.error}
      <div
        class={`text-red-500 bg-red-100 border border-red-700 ${formMessages}`}
      >
        <p>Error!</p>
        <p>{form.error}</p>
      </div>
    {/if}
  </div>
</div>
