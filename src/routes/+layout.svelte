<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import SunIcon from "$lib/assets/sun_icon.svelte";
  import MoonIcon from "$lib/assets/moon_icon.svelte";
  import logo from "$lib/assets/logo.svg";

  export let currentPath: string;

  let modalState: AuthModal = null;

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return currentPath === path ? "font-bold border-b-2 border-neutral" : "";
  }
</script>

<div class="flex min-h-screen flex-col">
  <div class="navbar sticky top-0 z-50 mb-8 bg-base-100 px-20 opacity-95 shadow-lg">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost flex items-center text-xl font-black hover:bg-inherit">
        <img src={logo} alt="Logo" class="mr-2 h-8" width="32" />
        ExerciseDB
      </a>
    </div>
    <div class="navbar-center hidden space-x-4 lg:flex">
      <a class="btn btn-ghost rounded-md hover:bg-inherit {isActive('/workout-planner')}" href="/workout-planner">
        Trainingsplan erstellen
      </a>
      <a class="btn btn-ghost rounded-md hover:bg-inherit {isActive('/exercises')}" href="/exercises">
        Übungsübersicht
      </a>
    </div>
    <div class="navbar-end flex items-center space-x-4">
      <label class="swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" class="theme-controller" value="dim" />
        <SunIcon />
        <MoonIcon />
      </label>
      <button on:click={toggleModal} class="btn btn-secondary btn-sm rounded-md">Anmelden</button>
    </div>
  </div>

  <!-- <AuthController bind:modalState />-->
  <main class="flex-grow p-4">
    <slot />
  </main>

  <footer class="footer items-center bg-neutral p-4 text-neutral-content">
    <aside class="grid-flow-col items-center">
      <img src={logo} alt="Logo" class="mr-2" width="36" height="36" />
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </aside>
  </footer>
</div>
