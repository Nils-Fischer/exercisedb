<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../../db/supabase";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let isEmailValid = true;
  let passwordsMatch = true;
  let acceptTerms = false;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  function handlePasswordInput() {
    passwordsMatch = password === confirmPassword;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!isEmailValid || !passwordsMatch || !acceptTerms) {
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log("Erfolgreich registriert:", data);
      closeModal();
      // You might want to show a success message or redirect the user
    } catch (error) {
      errorMessage = "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
    }
  }

  async function handleGoogleSignUp() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      console.log("Google Registrierung initiiert");
    } catch (error) {
      console.error("Fehler bei der Google-Registrierung:", error);
      errorMessage = "Google-Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
    }
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToSignIn() {
    dispatch("switchToSignIn");
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function openTermsAndConditions() {
    // Implement opening terms and conditions
    console.log("Allgemeine Geschäftsbedingungen öffnen");
  }
</script>

<h1 class="mb-2 self-center text-3xl font-bold">Konto erstellen</h1>
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
    </div>
    <input
      type="password"
      bind:value={password}
      on:input={handlePasswordInput}
      class="input input-bordered w-full"
      placeholder="Geben Sie Ihr Passwort ein"
      required
    />
  </label>
  <label class="form-control">
    <div class="label">
      <span class="label-text">Passwort bestätigen</span>
    </div>
    <input
      type="password"
      bind:value={confirmPassword}
      on:input={handlePasswordInput}
      class="input input-bordered w-full {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
      placeholder="Bestätigen Sie Ihr Passwort"
      required
    />
    {#if !passwordsMatch && confirmPassword}
      <span class="label-text-alt mt-1 text-error">Die Passwörter stimmen nicht überein.</span>
    {/if}
  </label>
  <div class="form-control mt-2">
    <label class="label cursor-pointer gap-2 self-start">
      <input type="checkbox" class="checkbox" bind:checked={acceptTerms} required />
      <span class="label-text">
        Ich akzeptiere die
        <button type="button" on:click={openTermsAndConditions} class="link link-secondary"
          >Allgemeinen Geschäftsbedingungen</button
        >
      </span>
    </label>
  </div>
  <button type="submit" class="btn btn-primary mt-2 w-full" disabled={!isEmailValid || !passwordsMatch || !acceptTerms}
    >Konto erstellen</button
  >
  {#if errorMessage}
    <span class="text-sm text-error">{errorMessage}</span>
  {/if}
</form>
<div class="divider my-2">ODER</div>
<button type="button" class="btn btn-outline w-full" on:click={handleGoogleSignUp}>
  <i class="fa-brands fa-google mr-2"></i>
  Mit Google registrieren
</button>
<div class="mt-4 text-center">
  <span>Bereits ein Konto?</span>
  <button type="button" on:click={switchToSignIn} class="link link-primary ml-1">Anmelden</button>
</div>
