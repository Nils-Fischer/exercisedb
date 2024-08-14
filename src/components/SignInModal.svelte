<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RegisterModal from "./RegisterModal.svelte";

  export let showModal: boolean = false;

  let email = "";
  let password = "";
  let showRegisterModal = false;

  const dispatch = createEventDispatcher();

  function handleSignIn() {
    console.log("Anmelden mit:", email, password);
    closeModal();
  }

  function handleGoogleSignIn() {
    console.log("Anmelden mit Google");
    closeModal();
  }

  function closeModal() {
    showModal = false;
    showRegisterModal = false;
    dispatch("close");
  }

  function switchToRegister() {
    showRegisterModal = true;
  }

  function handleSwitchToSignIn() {
    showRegisterModal = false;
  }
</script>

{#if showModal}
  {#if !showRegisterModal}
    <div class="fixed inset-0 z-[100] flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="card z-[101] w-96 bg-base-100 shadow-xl">
        <div class="card-body bg-opacity-100">
          <h1 class="card-title">Anmelden</h1>
          <form on:submit|preventDefault={handleSignIn} class="space-y-4">
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
              <button type="submit" class="btn btn-primary">Anmelden</button>
            </div>
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
  {:else}
    <RegisterModal bind:showModal={showRegisterModal} on:close={closeModal} on:switchToSignIn={handleSwitchToSignIn} />
  {/if}
{/if}
