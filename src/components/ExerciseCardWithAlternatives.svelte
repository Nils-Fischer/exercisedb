<script lang="ts">
  import type { Exercise, ExerciseWithAlternatives } from "../lib/types";
  import { createEventDispatcher } from "svelte";

  export let exercise: ExerciseWithAlternatives;

  const dispatch = createEventDispatcher();

  function showAlternatives() {
    dispatch("showAlternatives", { alternatives: exercise.alternatives });
  }
</script>

<div class="max-h-lg card max-w-72 bg-neutral shadow-xl">
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
    <div class="mt-4 flex justify-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span
        on:click={showAlternatives}
        class="cursor-pointer text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Alternativen ↓
      </span>
    </div>
  </div>
</div>
