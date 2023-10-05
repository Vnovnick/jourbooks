<script lang="ts">
  import { enhance } from "$app/forms";

  export let form;
  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let confirmPassword: string;
  let isLoginView = true;
  const loginInputs = "w-[300px] rounded-md h-10 pl-2";
  const formMessages = "w-[450px] m-auto rounded-md p-1 text-left";
  const buttonStyling =
    "bg-green-200 rounded-md p-1 hover:bg-black hover:text-white";
</script>

<div
  class="xl:w-[1200px] w-[600px] h-[400px] m-auto flex flex-col xl:flex-row justify-between"
>
  {#if isLoginView}
    <form class="w-[550px] flex flex-col gap-y-4 my-auto">
      <p class="text-xl font-semibold text-center">Welcome to Jourbooks</p>
      <div class="w-full justify-between flex">
        <p>Email:</p>
        <input class={loginInputs} type="text" bind:value={userEmail} />
      </div>
      <div class="w-full justify-between flex">
        <p>Password:</p>
        <input class={loginInputs} type="text" bind:value={userPassword} />
      </div>
      <div class="flex mx-auto gap-5 text-sm">
        <button class={buttonStyling}>Login</button>
        <button class={buttonStyling} on:click={() => (isLoginView = false)}
          >Sign Up</button
        >
      </div>
    </form>
  {:else}
    <form
      class="w-[550px] flex flex-col gap-y-4 my-auto"
      method="post"
      action="?/register"
      use:enhance
    >
      <p class="text-xl font-semibold text-center">Create a New Account</p>
      <div class="w-full justify-between flex">
        <p>User Name:</p>
        <input
          class={loginInputs}
          type="text"
          bind:value={userName}
          name="username"
          required
        />
      </div>
      <div class="w-full justify-between flex">
        <p>Email:</p>
        <input
          class={loginInputs}
          type="text"
          bind:value={userEmail}
          name="email"
          required
        />
      </div>
      <div class="w-full justify-between flex">
        <p>Password:</p>
        <input
          class={loginInputs}
          type="password"
          bind:value={userPassword}
          name="password"
          required
        />
      </div>
      <div class="w-full justify-between flex">
        <p>Confirm Password:</p>
        <input
          class={loginInputs}
          type="password"
          bind:value={confirmPassword}
          name="confirmPassword"
          required
        />
      </div>
      <div class="flex mx-auto gap-5 text-sm">
        <button
          class={buttonStyling}
          type="button"
          on:click={() => (isLoginView = true)}>Cancel</button
        >
        <button class={buttonStyling} type="submit">Create Account</button>
      </div>
    </form>
  {/if}
  <div class="flex w-[550px]">
    {#if form?.success}
      <div
        class={`text-green-800 bg-green-100 border border-green-700 ${formMessages}`}
      >
        <p>Success! Your account information has been saved</p>
      </div>
    {/if}
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
