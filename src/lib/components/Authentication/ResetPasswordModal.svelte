<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  let newPassword = "";
  let confirmPassword = "";
  let isPasswordValid = true;
  let passwordsMatch = true;
  let errorMessage = "";
  let successMessage = "";
  let isLoading = false;

  const dispatch = createEventDispatcher();

  function validatePassword(password: string): boolean {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

  function handlePasswordInput() {
    isPasswordValid = validatePassword(newPassword);
    passwordsMatch = newPassword === confirmPassword;
  }

  function closeModal() {
    dispatch("close");
  }

  const enhancePasswordRecover: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    successMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage = result.data?.message || "Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.";
        update();
      } else if (result.type === "success") {
        successMessage = "Ihr Passwort wurde erfolgreich zurückgesetzt.";
        update();
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    };
  };
</script>

<div class="modal modal-open">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">Passwort zurücksetzen</h3>
    <form method="POST" action="/auth?/updatePassword" use:enhance={enhancePasswordRecover} class="space-y-4">
      <div class="form-control">
        <label class="label" for="newPassword">
          <span class="label-text">Neues Passwort</span>
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          bind:value={newPassword}
          on:input={handlePasswordInput}
          class="input input-bordered w-full {!isPasswordValid && newPassword ? 'input-error' : ''}"
          placeholder="Geben Sie Ihr neues Passwort ein"
          required
        />
        {#if !isPasswordValid && newPassword}
          <label class="label" for="newPassword">
            <span class="label-text-alt text-error">
              Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen
              Kleinbuchstaben und eine Zahl enthalten.
            </span>
          </label>
        {/if}
      </div>

      <div class="form-control">
        <label class="label" for="confirmPassword">
          <span class="label-text">Passwort bestätigen</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          bind:value={confirmPassword}
          on:input={handlePasswordInput}
          class="input input-bordered w-full {!passwordsMatch && confirmPassword ? 'input-error' : ''}"
          placeholder="Bestätigen Sie Ihr neues Passwort"
          required
        />
        {#if !passwordsMatch && confirmPassword}
          <label class="label" for="confirmPassword">
            <span class="label-text-alt text-error">Die Passwörter stimmen nicht überein.</span>
          </label>
        {/if}
      </div>

      <button type="submit" class="btn btn-primary w-full" disabled={!isPasswordValid || !passwordsMatch || isLoading}>
        {#if isLoading}
          <span class="loading loading-spinner"></span>
        {:else}
          Passwort aktualisieren
        {/if}
      </button>
    </form>

    {#if errorMessage}
      <div class="alert alert-error mt-4" transition:fade={{ duration: 200 }}>
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
      <div class="alert alert-success mt-4" transition:fade={{ duration: 200 }}>
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

    <div class="modal-action">
      <button class="btn" on:click={closeModal}>Schließen</button>
    </div>
  </div>
</div>
