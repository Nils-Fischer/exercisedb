<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import ExtendedCard from "./ExtendedCard.svelte";
  import type { Exercise } from "../lib/types";

  export let showModal: boolean = false;
  export let exercise: Exercise | null = null;

  const dispatch = createEventDispatcher();

  function closeModal() {
    showModal = false;
    dispatch("close");
  }
</script>

{#if showModal && exercise}
  <!-- Hintergrund über gesamte Fläche -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center"
    on:click={closeModal}
    transition:fade={{ duration: 300 }}
  >
    <!-- Modal und Bereich um die Karte herum -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="relative z-[101] h-full w-full bg-black opacity-50"
      on:click={closeModal}
      transition:fade={{ duration: 100 }}
    ></div>

    <!-- Der eigentliche Modal-Content, der die Karte enthält -->
    <div
      class="absolute z-[102] flex items-center justify-center"
      transition:fade={{ duration: 300 }}
      on:click|stopPropagation
    >
      <ExtendedCard {exercise} />
      <button
        on:click={closeModal}
        class="btn btn-circle btn-ghost btn-sm absolute right-5 top-1 border-2 border-white text-gray-300 hover:border-gray-600 hover:text-white"
      >
        ✕
      </button>
    </div>
  </div>
{/if}
