<!-- src/components/ExercisesPage.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import FilterMenu from './FilterMenu.svelte';
  import ExerciseGrid from './ExerciseGrid.svelte';
  import type { Exercise } from '../lib/types';

  export let exercises: Exercise[];
  export let filters: Map<keyof Exercise, Set<string>>;

  const filteredExercises = writable<Exercise[]>(exercises);

  function filterExercises(
    event: CustomEvent<{ value: Map<keyof Exercise, Set<string>> }>
  ) {
    filteredExercises.set(
      exercises.filter((exercise) => {
        for (const [category, values] of event.detail.value) {
          const result = exercise[category];
          const result_arr = Array.isArray(result) ? result : [result];
          if (values.size > 0 && !result_arr.some((item) => values.has(item))) {
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
</script>

<h1 class="mb-4 text-2xl font-bold">Exercises</h1>
<div class="flex">
  <div class="flex-shrink-0 p-4">
    <FilterMenu {filters} on:updateFilter={filterExercises} />
  </div>
  <div class="flex-grow">
    <ExerciseGrid exercises={filteredExercisesArray} />
  </div>
</div>
