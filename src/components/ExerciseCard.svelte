<!-- src/components/ExerciseCard.svelte -->
<script lang="ts">
  import type { Exercise } from '../lib/types';

  export let exercise: Exercise;
</script>

<div class="max-h-lg card max-w-md bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{exercise.name}</h2>
    <div class="flex flex-wrap space-x-1">
      <div class="badge">{exercise.level}</div>
      <div class="badge badge-neutral">{exercise.category}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary">{exercise.mechanic}</div>
    </div>
    <div class="flex space-x-2">
      <div class="flex h-52 w-52 items-center justify-center bg-gray-200">
        <span>Loading...</span>
      </div>
    </div>
    <div class="grid grid-cols-auto-fit gap-4">
      <div class="badge badge-accent">{exercise.category}</div>
    </div>
  </div>
</div>
