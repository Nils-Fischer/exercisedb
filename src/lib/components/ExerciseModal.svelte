<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import ExtendedCard from "./ExtendedCard.svelte";
  import type { Exercise } from "$lib/types";

  export let showModal: boolean = false;
  export let exercise: Exercise | null = null;

  const dispatch = createEventDispatcher();

  function closeModal() {
    showModal = false;
    dispatch("close");
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

{#if showModal && exercise}
  <div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
    <button
      class="absolute inset-0 h-full w-full cursor-default bg-black opacity-50"
      on:click={closeModal}
      on:keydown={handleOverlayKeydown}
      aria-label="Close modal"
      transition:fade={{ duration: 100 }}
    ></button>
    <ExtendedCard {exercise} />
  </div>
{/if}
