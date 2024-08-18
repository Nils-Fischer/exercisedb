<script lang="ts">
  import { writable } from "svelte/store";
  import FilterMenu from "./FilterMenu.svelte";
  import type { Exercise } from "../lib/types";
  import ExerciseModal from "./ExerciseModal.svelte";
  import { fade } from "svelte/transition";
  import ExerciseCard from "./ExerciseCard.svelte";

  export let exercises: Exercise[];
  export let filters: Map<keyof Exercise, Set<string>>;

  let selectedExercise: Exercise | null = null;
  let showModal = false;

  const filteredExercises = writable<Exercise[]>(exercises);

  function filterExercises(event: CustomEvent<{ value: Map<keyof Exercise, Set<string>> }>) {
    const filterMap = event.detail.value;
    filteredExercises.set(
      exercises.filter((exercise) => {
        for (const [category, values] of filterMap) {
          if (values.size === 0) continue;
          const result = exercise[category];
          const result_arr = Array.isArray(result) ? result : [result];
          if (!result_arr.some((item) => values.has(item.toString()))) {
            return false;
          }
        }
        return true;
      })
    );
  }

  let filteredExercisesArray: Exercise[] = [];

  $: filteredExercises.subscribe((value) => {
    filteredExercisesArray = value;
  });

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

<div class="flex flex-col items-center">
  <div class="z-30 mb-8">
    <FilterMenu {filters} on:updateFilter={filterExercises} />
  </div>
  <div class="w-full">
    <div class="grid grid-cols-auto-fill gap-4">
      {#each $filteredExercises as exercise}
        <ExerciseCard {exercise} on:click={openModal} />
      {/each}
    </div>
  </div>
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
