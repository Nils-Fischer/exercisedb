<!-- src/components/ExerciseCard.svelte -->
<script lang="ts">
  import type { Exercise, ExerciseWithAlternatives } from "../lib/types";

  export let exercise: ExerciseWithAlternatives;
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
    <div class="dropdown text-center">
      <div tabindex="0" role="button" class="-mb-12">﹀</div>
      <ul tabindex="0" class="menu dropdown-content">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  </div>
</div>
