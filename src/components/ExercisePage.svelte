<script lang="ts">
  import ExerciseCard from "./ExerciseCard.svelte";
  import ExerciseModal from "./ExerciseModal.svelte";
  import type { Exercise } from "../lib/types";

  export let exercises: Exercise[];
  export let filters: Map<keyof Exercise, Set<string>>;

  let selectedExercise: Exercise | null = null;
  let showModal = false;

  function openModal(event: { detail: { exercise: Exercise | null } }) {
    selectedExercise = event.detail.exercise;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedExercise = null;
  }
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each exercises as exercise}
    <ExerciseCard {exercise} on:openModal={openModal} />
  {/each}
</div>

<!-- Modal zum Anzeigen der ExtendedCard -->
<!-- Modal zum Anzeigen der ExtendedCard -->
<ExerciseModal {showModal} exercise={selectedExercise} on:close={closeModal} />
