<script lang="ts">
  import { enhance } from "$app/forms";

  export let form;
  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let confirmPassword: string;
  // let isLoginView = true;
</script>

<div class="login-container">
  <!-- {#if isLoginView}
      <h2>Welcome to JourBooks</h2>
      <form class="login-page-form">
        <div class="input-container">
          <p>Email:</p>
          <input class="login-input" type="text" bind:value={userEmail} />
        </div>
        <div class="input-container">
          <p>Password:</p>
          <input class="login-input" type="text" bind:value={userPassword} />
        </div>
        <div class="login-button-container">
          <button class="login-button">Login</button>
          <button class="login-button" on:click={() => (isLoginView = false)}
            >Sign Up</button
          >
        </div>
      </form>
    {:else} -->
  <h2>Create a New Account</h2>
  <form class="login-page-form" method="POST" action="?/register" use:enhance>
    <div class="input-container">
      <p>User Name:</p>
      <input
        class="login-input"
        type="text"
        bind:value={userName}
        name="username"
        required
      />
    </div>
    <div class="input-container">
      <p>Email:</p>
      <input
        class="login-input"
        type="text"
        bind:value={userEmail}
        name="email"
        required
      />
    </div>
    <div class="input-container">
      <p>Password:</p>
      <input
        class="login-input"
        type="password"
        bind:value={userPassword}
        name="password"
        required
      />
    </div>
    <div class="input-container">
      <p>Confirm Password:</p>
      <input
        class="login-input"
        type="password"
        bind:value={confirmPassword}
        name="confirmPassword"
        required
      />
    </div>
    <div class="login-button-container">
      <button class="login-button">Cancel</button>
      <button class="login-button" type="submit">Create Account</button>
    </div>
  </form>
  {#if form?.success}
    <div class="success">
      <p>Success! Your account information has been saved</p>
    </div>
  {/if}
  {#if form?.error}
    <div class="error">
      <p>Error!</p>
      <p>{form.error}</p>
    </div>
  {/if}
</div>

<style>
  .error {
    color: red;
    border-bottom: 1px rgb(247, 116, 116);
    background-color: rgb(253, 231, 231);
    border: 0.1rem red solid;
    width: 50%;
    margin: auto;
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-align: left;
    margin-top: 1rem;
  }
  .success {
    color: green;
    border-bottom: 1px rgb(148, 247, 148);
    background-color: rgb(232, 253, 231);
    border: 0.1rem green solid;
    width: 50%;
    margin: auto;
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-align: left;
    margin-top: 1rem;
  }
  .login-container {
    margin: auto;
    text-align: center;
  }

  .login-page-form {
    display: flex;
    flex-direction: column;
    width: fit-content;
    row-gap: 10px;
    text-align: left;
  }
  .login-input {
    width: 300px;
  }
  .input-container {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .login-button-container {
    display: flex;
    margin-inline: auto;
    column-gap: 0.5rem;
  }
  .login-button-container button {
    background-color: rgb(121, 250, 185);
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    font-family: "Lora", serif;
  }
  .login-button-container button:hover {
    background: rgb(20, 13, 5);
    color: white;
  }
</style>
