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
      <div class="badge badge-neutral">{exercise.force}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary">{exercise.mechanic}</div>
      <div class="badge badge-primary">{exercise.equipment}</div>
    </div>
    <div class="flex space-x-2">
      <div class="flex h-52 w-52 items-center justify-center bg-gray-200">
        <span>Loading...</span>
      </div>
    </div>
    <div class="grid-cols-auto-fitgrid gap-4">
      {#each exercise.primaryMuscles as muscle}
        <div class="badge badge-accent">{muscle}</div>
      {/each}
      {#each exercise.secondaryMuscles as muscle}
        <div class="badge badge-ghost">{muscle}</div>
      {/each}
    </div>
  </div>
</div>
