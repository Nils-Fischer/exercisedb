<script lang="ts">
  import FilterMenu from "./FilterMenu.svelte";
  import type { Exercise } from "$lib/types";
  import ExerciseModal from "./ExerciseModal.svelte";
  import { fade } from "svelte/transition";
  import ExerciseCard from "./ExerciseCard.svelte";
  import { onMount } from "svelte";

  export let exercises: Exercise[] = [];
  export let filters: Map<keyof Exercise, Set<string>> = new Map();

  let selectedExercise: Exercise | null = null;
  let showModal = false;
  let filteredExercises: Exercise[] = [];
  let isLoaded = false;

  onMount(() => {
    filteredExercises = [...exercises];
    isLoaded = true;
  });

  function updateFilteredExercises(event: CustomEvent<{ results?: Exercise[]; value?: Exercise[] }>) {
    if (event.detail.results) {
      filteredExercises = event.detail.results;
    } else if (event.detail.value) {
      filteredExercises = event.detail.value;
    } else {
      filteredExercises = [...exercises];
    }
  }

  function openModal(event: { detail: { exercise: Exercise | null } }) {
    selectedExercise = event.detail.exercise;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedExercise = null;
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

<div class="mb-4 flex w-full flex-col space-y-4">
  <div class="flex-shrink-0">
    <FilterMenu {filters} {exercises} on:updateFilter={updateFilteredExercises} />
  </div>
</div>

<!-- Exercise Cards -->
<div class="w-full">
  {#if isLoaded}
    {#if filteredExercises.length === 0}
      <div class="alert alert-warning mt-2">
        <span>Keine Übungen gefunden, die mit Ihrer Suche übereinstimmen.</span>
      </div>
    {:else}
      <div class="grid grid-cols-auto-fill gap-4">
        {#each filteredExercises as exercise}
          <ExerciseCard {exercise} on:click={openModal} />
        {/each}
      </div>
    {/if}
  {:else}
    <div class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
</div>

{#if showModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center" transition:fade={{ duration: 100 }}>
    <button
      class="absolute inset-0 h-full w-full cursor-default bg-black opacity-50"
      on:click={closeModal}
      on:keydown={handleOverlayKeydown}
      aria-label="Close modal"
      transition:fade={{ duration: 100 }}
    ></button>
    <ExerciseModal {showModal} exercise={selectedExercise} on:close={closeModal} />
  </div>
{/if}
