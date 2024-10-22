<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import logo from "$lib/assets/logo.svg";
  import { page } from "$app/stores";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import AuthControllerModal from "$lib/components/Authentication/AuthControllerModal.svelte";
  import { Moon, Sun } from "lucide-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let data;
  $: ({ session, supabase, profile } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => data.subscription.unsubscribe();
  });

  let modalState: AuthModal = null;

  function invalidateAuth() {
    invalidate("supabase:auth");
  }

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return $page.url.pathname === path ? "font-bold border-b-2 border-neutral" : "";
  }

  const enhanceLogout: SubmitFunction = () => {
    return async ({ result, update }) => {
      await applyAction(result);
      if (result.type === "success") {
        invalidateAuth();
      }
    };
  };
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
        <input type="checkbox" class="theme-controller" value="dim" />
        <Sun class="swap-on" size="30" aria-hidden="true" />
        <Moon class="swap-off" size="30" aria-hidden="true" />
      </label>

      {#if profile}
        <div class="dropdown dropdown-end">
          <button id="profile-dropdown" class="btn btn-secondary btn-sm rounded-md">{profile.firstName}</button>
          <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
            <ul
              class="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
              aria-labelledby="profile-dropdown"
            >
              <li><a href="/private/profile">Profil</a></li>
              <li><a href="/private/settings">Einstellungen</a></li>
              <li>
                <button type="submit" class="w-full text-left">Ausloggen</button>
              </li>
            </ul>
          </form>
        </div>
      {:else}
        <button on:click={toggleModal} class="btn btn-secondary btn-sm rounded-md">Anmelden</button>
      {/if}
    </div>
  </div>

  <AuthControllerModal bind:modalState on:close={invalidateAuth} />

  <main class="flex-grow p-4">
    <slot />
  </main>

  <footer class="footer items-center bg-neutral p-4 text-neutral-content">
    <aside class="grid-flow-col items-center">
      <img src={logo} alt="Logo" class="mr-2" width="36" height="36" />
      <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="/help/privacy-policy" class="link-hover link">Datenschutz</a>
      <a href="/help/terms-of-service" class="link-hover link">Nutzungsbedingungen</a>
    </nav>
  </footer>
</div>
