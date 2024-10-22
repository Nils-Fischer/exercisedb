<script lang="ts">
  import { enhance } from "$app/forms";
  import { applyAction } from "$app/forms";
  import { fade } from "svelte/transition";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { createEventDispatcher } from "svelte";
  import { page } from "$app/stores";
  import { Eye, EyeOff } from "lucide-svelte";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let isEmailValid = true;
  let isPasswordValid = true;
  let passwordsMatch = true;
  let acceptTerms = false;
  let errorMessage = "";
  let showPassword = false;
  let showConfirmPassword = false;
  let isLoading = false;

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase());
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  function handlePasswordInput() {
    isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /[\d]/.test(password);
    passwordsMatch = password === confirmPassword;
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToSignIn() {
    dispatch("switchToSignIn");
  }

  function openTermsAndConditions() {
    // TODO: Implement opening terms and conditions
    console.log("Allgemeine Geschäftsbedingungen öffnen");
  }

  const enhanceRegister: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage =
          (result.data?.message as string) || "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
        update();
      } else if (result.type === "success") {
        closeModal();
      }
    };
  };

  const enhanceGoogleSignIn: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage =
          (result.data?.message as string) || "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
        update();
      } else if (result.type === "success") {
        window.location.href = result.data?.url;
      }
    };
  };
</script>

<h1 class="mb-4 text-center text-3xl font-bold">Konto erstellen</h1>

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

<form method="POST" action="/auth?/signup" use:enhance={enhanceRegister} class="space-y-4">
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

  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Passwort</span>
    </div>
    <div class="relative">
      {#if showPassword}
        <input
          name="password"
          type="text"
          bind:value={password}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10"
          placeholder="Geben Sie Ihr Passwort ein"
          required
        />
      {:else}
        <input
          name="password"
          type="password"
          bind:value={password}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10"
          placeholder="Geben Sie Ihr Passwort ein"
          required
        />
      {/if}
      <button
        type="button"
        class="btn-sm absolute right-2 top-1/2 -translate-y-1/2"
        on:click={togglePasswordVisibility}
      >
        {#if showPassword}
          <Eye size="20" />
        {:else}
          <EyeOff size="20" />
        {/if}
      </button>
    </div>
  </label>
  {#if !isPasswordValid && password}
    <div class="mt-1 text-sm text-error">
      <p>Das Passwort erfüllt nicht die Sicherheitsanforderungen. Bitte beachten Sie:</p>
      <ul class="mt-1 list-disc pl-5">
        <li>Mindestens 8 Zeichen lang</li>
        <li>Mindestens ein Großbuchstabe (A-Z)</li>
        <li>Mindestens eine Zahl (0-9)</li>
      </ul>
    </div>
  {/if}

  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Passwort bestätigen</span>
    </div>
    <div class="relative">
      {#if showConfirmPassword}
        <input
          name="confirmPassword"
          type="text"
          bind:value={confirmPassword}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10 {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
          placeholder="Bestätigen Sie Ihr Passwort"
          required
        />
      {:else}
        <input
          name="confirmPassword"
          type="password"
          bind:value={confirmPassword}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10 {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
          placeholder="Bestätigen Sie Ihr Passwort"
          required
        />
      {/if}
      <button
        type="button"
        class="btn-sm absolute right-2 top-1/2 -translate-y-1/2"
        on:click={toggleConfirmPasswordVisibility}
      >
        {#if showConfirmPassword}
          <Eye size="20" />
        {:else}
          <EyeOff size="20" />
        {/if}
      </button>
    </div>
    {#if !passwordsMatch && confirmPassword}
      <div class="label">
        <span class="label-text-alt text-error">Die Passwörter stimmen nicht überein.</span>
      </div>
    {/if}
  </label>

  <div class="form-control">
    <label class="label cursor-pointer">
      <input name="acceptTerms" type="checkbox" class="checkbox" bind:checked={acceptTerms} required />
      <span class="label-text ml-2">
        Ich akzeptiere die
        <button type="button" on:click={openTermsAndConditions} class="link link-secondary">
          Allgemeinen Geschäftsbedingungen
        </button>
      </span>
    </label>
  </div>

  <button
    type="submit"
    class="btn btn-primary w-full"
    disabled={!isPasswordValid || !isEmailValid || !passwordsMatch || !acceptTerms || isLoading}
  >
    {#if isLoading}
      <span class="loading loading-spinner"></span>
    {:else}
      Konto erstellen
    {/if}
  </button>
</form>

<div class="divider my-4">ODER</div>

<form method="POST" use:enhance={enhanceGoogleSignIn}>
  <button formaction="/auth?/login&provider=google" type="submit" class="btn btn-outline w-full">
    <svg viewBox="0 0 24 24" class="mr-2 h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
      <path fill="none" d="M1 1h22v22H1z" />
    </svg>
    Mit Google registrieren
  </button>
  <input name="redirectTo" type="hidden" value={$page.url.toString()} />
</form>

<div class="mt-4 text-center">
  <span>Bereits ein Konto?</span>
  <button type="button" on:click={switchToSignIn} class="link link-primary ml-1">Anmelden</button>
</div>
