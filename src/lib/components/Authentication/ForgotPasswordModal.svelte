<script lang="ts">
  import { enhance } from "$app/forms";
  import { applyAction } from "$app/forms";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  let email = "";
  let isEmailValid = true;
  let errorMessage = "";
  let successMessage = "";
  let isLoading = false;

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
    errorMessage = "";
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToSignIn() {
    dispatch("switchToSignIn");
  }

  const enhanceResetPassword: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    successMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage =
          result.data?.message || "Fehler beim Senden der Passwort-Zurücksetz-E-Mail. Bitte versuchen Sie es erneut.";
        update();
      } else if (result.type === "success") {
        successMessage = "Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.";
        update();
      }
    };
  };
</script>

<h1 class="mb-4 text-2xl font-bold">Passwort vergessen?</h1>
<form method="POST" action="/auth?/resetPassword" use:enhance={enhanceResetPassword} class="flex flex-col gap-4">
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">E-Mail</span>
    </div>
    <input
      name="email"
      type="email"
      bind:value={email}
      on:input={handleEmailInput}
      class="input input-bordered w-full {!isEmailValid && email ? 'input-error' : ''}"
      placeholder="Geben Sie Ihre E-Mail ein"
      required
    />
    {#if !isEmailValid && email}
      <div class="label">
        <span class="label-text-alt text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
      </div>
    {/if}
  </label>
  <button type="submit" class="btn btn-primary w-full" disabled={!isEmailValid || isLoading}>
    {#if isLoading}
      <span class="loading loading-spinner"></span>
    {:else}
      Passwort zurücksetzen
    {/if}
  </button>
  {#if errorMessage}
    <div class="alert alert-error" transition:fade={{ duration: 200 }}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  {/if}
  {#if successMessage}
    <div class="alert alert-success" transition:fade={{ duration: 200 }}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{successMessage}</span>
    </div>
  {/if}
</form>
<div class="mt-4 text-center">
  <span>Erinnern Sie sich an Ihr Passwort?</span>
  <button type="button" on:click={switchToSignIn} class="link link-primary ml-1">Hier anmelden</button>
</div>
