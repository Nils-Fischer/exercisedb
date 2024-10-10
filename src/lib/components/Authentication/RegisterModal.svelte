<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "$db/supabase";

  // Import Font Awesome
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faGoogle } from "@fortawesome/free-brands-svg-icons";
  import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  // Add icons to the library
  library.add(faGoogle, faEye, faEyeSlash);

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

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
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
    <div class="relative">
      {#if showPassword}
        <input
          type="text"
          bind:value={password}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10"
          placeholder="Geben Sie Ihr Passwort ein"
          required
        />
      {:else}
        <input
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
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        on:click={togglePasswordVisibility}
      >
        <Fa icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  </label>
  {#if !isPasswordValid && password}
    <div class="label-text-alt mt-2 text-error">
      <p>Das Passwort erfüllt nicht die Sicherheitsanforderungen. Bitte beachten Sie:</p>
      <ul class="mt-1 list-disc pl-5">
        <li>Mindestens 8 Zeichen lang</li>
        <li>Mindestens ein Großbuchstabe (A-Z)</li>
        <li>Mindestens eine Zahl (0-9)</li>
      </ul>
    </div>
  {/if}

  <label class="form-control">
    <div class="label">
      <span class="label-text">Passwort bestätigen</span>
    </div>
    <div class="relative">
      {#if showConfirmPassword}
        <input
          type="text"
          bind:value={confirmPassword}
          on:input={handlePasswordInput}
          class="input input-bordered w-full pr-10 {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
          placeholder="Bestätigen Sie Ihr Passwort"
          required
        />
      {:else}
        <input
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
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        on:click={toggleConfirmPasswordVisibility}
      >
        <Fa icon={showConfirmPassword ? faEyeSlash : faEye} />
      </button>
    </div>
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
  <button
    type="submit"
    class="btn btn-primary mt-2 w-full"
    disabled={!isPasswordValid || !isEmailValid || !passwordsMatch || !acceptTerms}>Konto erstellen</button
  >
  {#if errorMessage}
    <span class="text-sm text-error">{errorMessage}</span>
  {/if}
</form>
<div class="divider my-2">ODER</div>
<button type="button" class="btn btn-outline w-full" on:click={handleGoogleSignUp}>
  <Fa icon={faGoogle} class="mr-2" />
  Mit Google registrieren
</button>
<div class="mt-4 text-center">
  <span>Bereits ein Konto?</span>
  <button type="button" on:click={switchToSignIn} class="link link-primary ml-1">Anmelden</button>
</div>
