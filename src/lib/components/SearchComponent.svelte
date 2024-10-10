<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import type { Exercise } from "$lib/types";

  export let exercises: Exercise[] = [];

  const dispatch = createEventDispatcher();
  let searchQuery = "";
  const filteredExercises = writable<Exercise[]>(exercises);

  function searchExercises() {
    const filtered = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()));
    filteredExercises.set(filtered);

    // Emit the filtered exercises
    dispatch("search", { query: searchQuery, results: filtered });
  }

  // Update search results whenever searchQuery changes
  $: searchQuery, searchExercises();

  $: filteredExercisesArray = $filteredExercises;
</script>

<label class="input input-bordered flex w-full max-w-xl items-center gap-2">
  <input type="text" class="grow" placeholder="Search" bind:value={searchQuery} />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
    <path
      fill-rule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clip-rule="evenodd"
    />
  </svg>
</label>

{#if searchQuery !== "" && filteredExercisesArray.length === 0}
  <div class="mt-2 text-center text-gray-500">
    <p>Keine Übungen gefunden, die mit Ihrer Suche übereinstimmen.</p>
  </div>
{/if}
