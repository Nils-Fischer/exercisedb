<script lang="ts">
  import type { Exercise, ExerciseWithAlternatives } from "../lib/types";
  import { createEventDispatcher } from "svelte";

  export let exercise: ExerciseWithAlternatives;

  const dispatch = createEventDispatcher();

  function showAlternatives() {
    dispatch("showAlternatives", { alternatives: exercise.alternatives });
  }
</script>

<div class="max-h-lg card max-w-72 bg-neutral-content shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{exercise.primaryExercise.name}</h2>
    <div class="flex flex-wrap space-x-1">
      <div class="badge">{exercise.primaryExercise.level}</div>
      <div class="badge badge-neutral">{exercise.primaryExercise.category}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary">
        {exercise.primaryExercise.mechanic}
      </div>
    </div>
    <div class="flex space-x-2">
      <div class="flex h-52 w-52 items-center justify-center bg-gray-200">
        <span>Loading...</span>
      </div>
    </div>
    <div class="grid grid-cols-auto-fit gap-4">
      <div class="badge badge-accent">{exercise.primaryExercise.category}</div>
    </div>
    <button
      on:click={showAlternatives}
      class="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Zeig Alternativen
    </button>
  </div>
</div>
