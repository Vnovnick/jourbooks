<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  export let form;

  let newUserName: string;
  let newUserEmail: string;
  let newUserPassword: string;
  let confirmPassword: string;

  const loginInputs = "w-[300px] rounded-md h-10 pl-2 border border-black";
  const formMessages = "w-[450px] m-auto rounded-md p-1 text-left";
  const buttonStyling =
    "bg-green-200 rounded-md p-1 hover:bg-black hover:text-white";
</script>

<div
  class="bg-green-50 w-[1024px] h-[480px] m-auto flex flex-col justify-between relative items-center"
>
  <form
    class="w-[550px] flex flex-col gap-y-4 my-auto"
    method="post"
    action="?/register"
    use:enhance
  >
    <p class="text-xl font-semibold text-center">Create a New Account</p>
    <div class="w-full justify-between flex items-center">
      <p>User Name:</p>
      <input
        class={loginInputs}
        type="text"
        bind:value={newUserName}
        name="username"
      />
    </div>
    <div class="w-full justify-between flex items-center">
      <p>Email:</p>
      <input
        class={loginInputs}
        type="text"
        bind:value={newUserEmail}
        name="email"
      />
    </div>
    <div class="w-full justify-between flex items-center">
      <p>Password:</p>
      <input
        class={loginInputs}
        type="password"
        bind:value={newUserPassword}
        name="password"
      />
    </div>
    <div class="w-full justify-between flex items-center">
      <p>Confirm Password:</p>
      <input
        class={loginInputs}
        type="password"
        bind:value={confirmPassword}
        name="confirmPassword"
      />
    </div>
    <div class="flex mx-auto gap-5 text-sm">
      <button class={buttonStyling} type="submit">Create Account</button>
      <button
        class={buttonStyling}
        type="button"
        on:click={() => goto("/login")}>Login</button
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
