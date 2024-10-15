<script lang="ts">
  import SignInModal from "./SignInModal.svelte";
  import RegisterModal from "./RegisterModal.svelte";
  import ForgotPasswordModal from "./ForgotPasswordModal.svelte";
  import type { AuthModal } from "$lib/types";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import ResetPasswordModal from "./ResetPasswordModal.svelte";

  export let modalState: AuthModal;

  const dispatch = createEventDispatcher();

  function signIn() {
    modalState = "signIn";
  }

  function register() {
    modalState = "register";
  }

  function forgotPassword() {
    modalState = "forgotPassword";
  }

  function closeModal() {
    modalState = null;
    dispatch("close");
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

{#if modalState !== null}
  <div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
    <button
      class="absolute inset-0 h-full w-full cursor-default bg-black opacity-50"
      on:click={closeModal}
      on:keydown={handleOverlayKeydown}
      aria-label="Close modal"
      transition:fade={{ duration: 100 }}
    ></button>
    <div class="z-[101] flex w-96 flex-col gap-4 rounded-box bg-base-100 p-6" transition:fade={{ duration: 100 }}>
      {#if modalState === "signIn"}
        <SignInModal on:close={closeModal} on:switchToRegister={register} on:switchToForgotPassword={forgotPassword} />
      {:else if modalState === "register"}
        <RegisterModal on:close={closeModal} on:switchToSignIn={signIn} />
      {:else if modalState === "forgotPassword"}
        <ForgotPasswordModal on:close={closeModal} on:switchToSignIn={signIn} />
      {:else if modalState === "resetPassword"}
        <ResetPasswordModal on:close={closeModal} />
      {/if}
    </div>
  </div>
{/if}
