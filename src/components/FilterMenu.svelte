<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Exercise } from "../lib/types";
  import { capitalize } from "../lib/utils";
  import { writable } from "svelte/store";

  export let exercises: Exercise[] = [];
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
  export let filters: Map<keyof Exercise, Set<string>>;
  const dispatch = createEventDispatcher();
  let activeFilters = new Map<keyof Exercise, Set<string>>();

  function updateActiveFilter(category: keyof Exercise, value: string) {
    const updatedFilters = new Map(activeFilters);
    const values = updatedFilters.get(category) || new Set();
    if (values.has(value)) {
      values.delete(value);
    } else {
      values.add(value);
    }
    if (values.size == 0) updatedFilters.delete(category);
    else updatedFilters.set(category, values);

    activeFilters = updatedFilters;
  }

  function toggleFilter(category: keyof Exercise, value: string) {
    updateActiveFilter(category, value);
    dispatch("updateFilter", { value: activeFilters });
  }

  function resetFilter() {
    activeFilters = new Map<keyof Exercise, Set<string>>();
    dispatch("updateFilter", { value: activeFilters });
  }
</script>

<div class="menu sticky top-28 z-10 rounded-box bg-neutral p-4 shadow-xl">
  <div class="flex items-center gap-4">
    <h2 class="menu-title text-neutral-content">
      <p>Filter</p>
    </h2>

    <ul class="flex flex-wrap gap-4">
      {#each filters as [category, values]}
        <li class="dropdown dropdown-bottom">
          <div tabindex="0" role="button" class="btn m-1">
            {capitalize(category.toString())}
          </div>
          <ul class="menu dropdown-content z-[50] w-52 rounded-box bg-base-100 p-2 shadow">
            {#each values as filter}
              <li>
                <button
                  type="button"
                  on:click={() => toggleFilter(category, filter)}
                  class="btn btn-ghost btn-sm justify-start rounded-none [--btn-focus-scale:1] {activeFilters
                    .get(category)
                    ?.has(filter)
                    ? 'btn-active'
                    : ''}"
                >
                  {capitalize(filter)}
                </button>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>

    <!-- Search Input Field -->
    <div class="flex-grow">
      <label class="input input-bordered flex w-full items-center gap-2">
        <input type="text" class="grow" placeholder="Search" bind:value={searchQuery} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>

    <!-- Reset Button -->
    <button title="Reset Filters" on:click={resetFilter} class="material-symbols-outlined btn btn-primary btn-sm">
      restart_alt
    </button>
  </div>
</div>
