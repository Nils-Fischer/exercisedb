<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../db/supabase";

  export let showModal: boolean = false;

  let email = "";
  let password = "";
  let isEmailValid = true;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  async function handleSignIn() {
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

  function handleGoogleSignIn() {
    console.log("Anmelden mit Google");
    closeModal();
  }

  function closeModal() {
    showModal = false;
    dispatch("close");
  }

  function switchToRegister() {
    dispatch("switchToRegister");
  }
</script>

{#if showModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
    <div class="absolute inset-0 bg-black opacity-50" transition:fade={{ duration: 100 }}></div>
    <div class="card z-[101] w-96 bg-base-100 shadow-xl" transition:fade={{ duration: 100 }}>
      <div class="card-body bg-opacity-100">
        <h2 class="card-title">Anmelden</h2>
        <form on:submit|preventDefault={handleSignIn} class="space-y-4">
          <div class="form-control mb-5">
            <label for="signin-email" class="label">
              <span class="label-text">E-Mail</span>
            </label>
            <input
              type="email"
              id="signin-email"
              bind:value={email}
              on:input={handleEmailInput}
              placeholder="Geben Sie Ihre E-Mail ein"
              class="input input-bordered w-full {!isEmailValid && email ? 'input-error' : ''}"
              required
            />
            {#if !isEmailValid && email}
              <label class="label" for="signin-email">
                <span class="label-text-alt text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
              </label>
            {/if}
          </div>
          <div class="form-control my-5">
            <label for="signin-password" class="label">
              <span class="label-text">Passwort</span>
            </label>
            <input
              type="password"
              id="signin-password"
              bind:value={password}
              placeholder="Geben Sie Ihr Passwort ein"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control" id="submit-button">
            <button type="submit" class="btn btn-primary" disabled={!isEmailValid}>Anmelden</button>
          </div>
          {#if errorMessage}
            <label class="label" for="submit-button">
              <span class="label-text-alt text-error">{errorMessage}</span>
            </label>
          {/if}
        </form>
        <div class="divider">ODER</div>
        <button on:click={handleGoogleSignIn} class="btn btn-outline"> Mit Google anmelden </button>
        <div class="mt-4 text-center">
          <p>Noch kein Konto?</p>
          <button on:click={switchToRegister} class="btn btn-link">Registrieren</button>
        </div>
        <button on:click={closeModal} class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </div>
    </div>
  </div>
{/if}
