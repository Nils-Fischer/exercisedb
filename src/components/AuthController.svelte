<script lang="ts">
  import SignInModal from "./SignInModal.svelte";
  import RegisterModal from "./RegisterModal.svelte";
  import ForgotPasswordModal from "./ForgotPasswordModal.svelte";
  import type { AuthModal } from "../lib/types";

  export let modalState: AuthModal;

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
  }
</script>

{#if modalState === "signIn"}
  <SignInModal on:close={closeModal} on:switchToRegister={register} on:switchToForgotPassword={forgotPassword} />
{:else if modalState === "register"}
  <RegisterModal on:close={closeModal} on:switchToSignIn={signIn} />
{:else if modalState === "forgotPassword"}
  <ForgotPasswordModal on:close={closeModal} on:switchToSignIn={signIn} />
{/if}
