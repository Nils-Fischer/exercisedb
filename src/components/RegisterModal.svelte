<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let showModal: boolean = false;

  let email = "";
  let password = "";
  let confirmPassword = "";

  const dispatch = createEventDispatcher();

  function handleRegister() {
    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    console.log("Registrierung mit:", email, password);
    closeModal();
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
  <div class="fixed inset-0 z-[100] flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="card z-[101] w-96 bg-base-100 shadow-xl">
      <div class="card-body bg-opacity-100">
        <h1 class="card-title">Registrieren</h1>
        <form on:submit|preventDefault={handleRegister} class="space-y-4">
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text">E-Mail</span>
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              placeholder="Geben Sie Ihre E-Mail ein"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control">
            <label for="password" class="label">
              <span class="label-text">Passwort</span>
            </label>
            <input
              type="password"
              id="password"
              bind:value={password}
              placeholder="Geben Sie Ihr Passwort ein"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control">
            <label for="confirmPassword" class="label">
              <span class="label-text">Passwort bestätigen</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              bind:value={confirmPassword}
              placeholder="Bestätigen Sie Ihr Passwort"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="form-control">
            <button type="submit" class="btn btn-primary">Registrieren</button>
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
