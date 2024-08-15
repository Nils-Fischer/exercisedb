<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { supabase } from "../db/supabase";

  let email = "";
  let isEmailValid = true;
  let errorMessage = "";
  let successMessage = "";

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
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      successMessage = "Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.";
      errorMessage = "";
    } catch (error) {
      errorMessage = "Fehler beim Senden der Passwort-Zurücksetz-E-Mail. Bitte versuchen Sie es erneut.";
      successMessage = "";
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
</script>

<div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
  <button
    class="absolute inset-0 h-full w-full cursor-default bg-black opacity-50"
    on:click={closeModal}
    on:keydown={handleOverlayKeydown}
    aria-label="Close modal"
    transition:fade={{ duration: 100 }}
  ></button>
  <div
    class="z-[101] flex w-[28rem] max-w-[90vw] flex-col gap-6 rounded-box bg-base-100 p-8 text-center"
    transition:fade={{ duration: 100 }}
  >
    <h1 class="text-2xl font-bold">Passwort vergessen?</h1>
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
      <button type="submit" class="btn btn-primary w-full" disabled={!isEmailValid}>Passwort zurücksetzen</button>
      {#if errorMessage}
        <span class="text-sm text-error">{errorMessage}</span>
      {/if}
      {#if successMessage}
        <span class="text-sm text-success">{successMessage}</span>
      {/if}
    </form>
    <span>
      Erinnern Sie sich an Ihr Passwort?
      <button type="button" on:click={switchToSignIn} class="link link-secondary">Hier anmelden</button>
    </span>
  </div>
</div>
