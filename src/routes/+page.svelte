<script lang="ts">
  import { enhance } from "$app/forms";

  export let form;
  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let confirmPassword: string;
  // let isLoginView = true;
</script>

<div class="login-page">
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
    <form class="login-page-form" method="POST" action="?/create" use:enhance>
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
          name="pass"
          required
        />
      </div>
      <div class="input-container">
        <p>Confirm Password:</p>
        <input
          class="login-input"
          type="password"
          bind:value={confirmPassword}
          name="confirmPass"
          required
        />
      </div>
      <div class="login-button-container">
        <button class="login-button">Cancel</button>
        <button class="login-button">Create Account</button>
      </div>
    </form>
    {#if form?.error}
      <div class="error">
        <p>Error!</p>
        <p>{form.error}</p>
      </div>
    {/if}
    <!-- {/if} -->
  </div>
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
  .login-page {
    display: flex;
    height: 100vh;
    width: 100vw;
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
  }
  .login-button-container button:hover {
    background: rgb(20, 13, 5);
    color: white;
  }
</style>
