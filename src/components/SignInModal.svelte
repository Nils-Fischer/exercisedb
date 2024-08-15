<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../db/supabase";

  let email = "";
  let password = "";
  let isEmailValid = true;
  let errorMessage = "";
  let rememberMe = false;

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!isEmailValid) {
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log("Erfolgreich angemeldet:", data.user);
      closeModal();
    } catch (error) {
      errorMessage = "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.";
    }
  }

  async function handleGoogleSignIn() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      console.log("Google Anmeldung initiiert");
    } catch (error) {
      console.error("Fehler bei der Google-Anmeldung:", error);
      errorMessage = "Google-Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.";
    }
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToRegister() {
    dispatch("switchToRegister");
  }

  function handleForgotPassword() {
    dispatch("switchToForgotPassword");
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

<div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
  <button
    class="absolute inset-0 h-full w-full cursor-default bg-black opacity-50"
    on:click={closeModal}
    on:keydown={handleOverlayKeydown}
    aria-label="Close modal"
    transition:fade={{ duration: 100 }}
  ></button>
  <div class="z-[101] flex w-96 flex-col gap-4 rounded-box bg-base-100 p-6" transition:fade={{ duration: 100 }}>
    <h1 class="self-center text-3xl font-bold">Anmelden</h1>
    <form on:submit={handleSubmit} class="flex flex-col gap-4">
      <label class="form-control">
        <div class="label">
          <span class="label-text">E-Mail</span>
        </div>
        <input
          type="email"
          bind:value={email}
          on:input={handleEmailInput}
          class="input input-bordered w-full {!isEmailValid && email ? 'input-error' : ''}"
          placeholder="Geben Sie Ihre E-Mail ein"
          required
        />
        {#if !isEmailValid && email}
          <span class="label-text-alt mt-1 text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
        {/if}
      </label>
      <label class="form-control">
        <div class="label">
          <span class="label-text">Passwort</span>
          <button type="button" on:click={handleForgotPassword} class="link label-text link-error"
            >Passwort vergessen?</button
          >
        </div>
        <input
          type="password"
          bind:value={password}
          class="input input-bordered w-full"
          placeholder="Geben Sie Ihr Passwort ein"
          required
        />
      </label>
      <div class="form-control">
        <label class="label cursor-pointer gap-2 self-start">
          <input type="checkbox" class="checkbox" bind:checked={rememberMe} />
          <span class="label-text">Angemeldet bleiben</span>
        </label>
      </div>
      <button type="submit" class="btn btn-primary w-full" disabled={!isEmailValid}>Anmelden</button>
      {#if errorMessage}
        <span class="text-sm text-error">{errorMessage}</span>
      {/if}
    </form>
    <div class="divider">ODER</div>
    <button type="button" class="btn btn-outline w-full" on:click={handleGoogleSignIn}>
      <i class="fa-brands fa-google mr-2"></i>
      Mit Google anmelden
    </button>
    <div class="mt-4 text-center">
      <span>Noch kein Konto?</span>
      <button type="button" on:click={switchToRegister} class="link link-primary ml-1">Registrieren</button>
    </div>
  </div>
</div>
