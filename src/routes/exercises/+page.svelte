<script lang="ts">
  import type { PageData } from "./$types";
  import FilterMenu from "$lib/components/FilterMenu.svelte";
  import type { Exercise } from "$lib/types";
  import ExerciseModal from "$lib/components/ExerciseModal.svelte";
  import { fade } from "svelte/transition";
  import ExerciseCard from "$lib/components/ExerciseCard.svelte";
  import { page } from "$app/stores";

  export let data: PageData;
  $: ({ exercises, filters } = data);

  let selectedExercise: Exercise | null = null;
  let showModal = false;

  $: searchQuery = $page.url.searchParams.get("search") || "";
  $: filteredExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(searchQuery));

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

<main class="container mx-auto p-4">
  <div class="mb-4 flex w-full flex-col space-y-4">
    <div class="flex-shrink-0">
      <FilterMenu
        {filters}
        on:search={(query) => {
          filteredExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(query.detail.toLowerCase()));
        }}
      />
    </div>
  </div>

  <!-- Exercise Cards -->
  <div class="w-full">
    {#if filteredExercises.length === 0}
      <div class="alert alert-warning mt-2">
        <span>Keine Übungen gefunden, die mit Ihrer Suche übereinstimmen.</span>
      </div>
    {:else}
      <div class="grid grid-cols-auto-fill gap-4">
        {#each filteredExercises as exercise (exercise.id)}
          <ExerciseCard {exercise} on:click={openModal} />
        {/each}
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
</main>
