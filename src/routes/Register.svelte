<script lang="ts">
  import { enhance } from "$app/forms";

  export let loginInputs: string;
  export let buttonStyling: string;
  export let isLoginView: boolean;
  let newUserName: string;
  let newUserEmail: string;
  let newUserPassword: string;
  let confirmPassword: string;
</script>

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
      bind:value={newUserName}
      name="username"
      required
    />
  </div>
  <div class="w-full justify-between flex">
    <p>Email:</p>
    <input
      class={loginInputs}
      type="text"
      bind:value={newUserEmail}
      name="email"
      required
    />
  </div>
  <div class="w-full justify-between flex">
    <p>Password:</p>
    <input
      class={loginInputs}
      type="password"
      bind:value={newUserPassword}
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
