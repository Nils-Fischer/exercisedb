<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../db/supabase";

  export let showModal: boolean = false;

  let email = "";
  let password = "";
  let confirmPassword = "";
  let isEmailValid = true;
  let isPasswordValid = true;
  let passwordsMatch = true;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function validatePassword(password: string) {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  function handlePasswordInput() {
    isPasswordValid = validatePassword(password);
    passwordsMatch = password === confirmPassword;
  }

  function handleConfirmPasswordInput() {
    passwordsMatch = password === confirmPassword;
  }

  async function handleRegister() {
    if (!isEmailValid || !passwordsMatch) {
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
    } catch (error) {
      errorMessage = "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
    }
  }

  function closeModal() {
    showModal = false;
    dispatch("close");
  }

  function switchToSignIn() {
    dispatch("switchToSignIn");
  }
</script>

{#if showModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 200 }}>
    <div class="absolute inset-0 bg-black opacity-50" transition:fade={{ duration: 200 }}></div>
    <div class="card z-[101] w-96 bg-base-100 shadow-xl" transition:fade={{ duration: 200 }}>
      <div class="card-body bg-opacity-100">
        <h2 class="card-title">Registrieren</h2>
        <form on:submit|preventDefault={handleRegister} class="space-y-4">
          <div class="form-control mb-5">
            <label for="register-email" class="label">
              <span class="label-text">E-Mail</span>
            </label>
            <input
              type="email"
              id="register-email"
              bind:value={email}
              on:input={handleEmailInput}
              placeholder="Geben Sie Ihre E-Mail ein"
              class="input input-bordered w-full {!isEmailValid && email ? 'input-error' : ''}"
              required
            />
            {#if !isEmailValid && email}
              <label class="label" for="register-email">
                <span class="label-text-alt text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
              </label>
            {/if}
          </div>
          <div class="form-control my-5">
            <label for="register-password" class="label">
              <span class="label-text">Passwort</span>
            </label>
            <input
              type="password"
              id="register-password"
              bind:value={password}
              on:input={handlePasswordInput}
              placeholder="Geben Sie Ihr Passwort ein"
              class="input input-bordered w-full {!isPasswordValid && password ? 'input-error' : ''}"
              required
            />
            {#if !isPasswordValid && password}
              <label class="label" for="register-password">
                <span class="label-text-alt text-error"
                  >Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben und eine Zahl enthalten.</span
                >
              </label>
            {/if}
            <div class="form-control my-5">
              <label for="register-confirm-password" class="label">
                <span class="label-text">Passwort bestätigen</span>
              </label>
              <input
                type="password"
                id="register-confirm-password"
                bind:value={confirmPassword}
                on:input={handleConfirmPasswordInput}
                placeholder="Bestätigen Sie Ihr Passwort"
                class="input input-bordered w-full {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
                required
              />
              {#if !passwordsMatch && confirmPassword}
                <label class="label" for="register-confirm-password">
                  <span class="label-text-alt text-error">Die Passwörter stimmen nicht überein.</span>
                </label>
              {/if}
            </div>
            <div class="form-control">
              <button type="submit" class="btn btn-primary" disabled={!isEmailValid || !passwordsMatch}
                >Registrieren</button
              >
            </div>
            {#if errorMessage}
              <label class="label" for="submit-button">
                <span class="label-text-alt text-error">{errorMessage}</span>
              </label>
            {/if}
          </div>
        </form>
        <div class="mt-4 text-center">
          <p>Bereits ein Konto?</p>
          <button on:click={switchToSignIn} class="btn btn-link">Anmelden</button>
        </div>
        <button on:click={closeModal} class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </div>
    </div>
  </div>
{/if}
