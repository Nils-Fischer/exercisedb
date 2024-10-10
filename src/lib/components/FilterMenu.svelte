<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Exercise } from "$lib/types";
  import { capitalize } from "$lib/utils";
  export let exercises: Exercise[] = [];
  export let filters: Map<keyof Exercise, Set<string>>;

  const dispatch = createEventDispatcher();
  let searchQuery = "";
  let filteredExercises: Exercise[] = exercises;
  let activeFilters = new Map<keyof Exercise, Set<string>>();

  $: searchQuery, searchExercises();
  $: isResetDisabled = activeFilters.size === 0 && searchQuery === "";

  function searchExercises() {
    const searchResults = filteredExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch("updateFilter", { results: searchResults });
  }

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
    filterExercises();
  }

  function resetFilter() {
    activeFilters = new Map<keyof Exercise, Set<string>>();
    searchQuery = "";
    filteredExercises = exercises;
    dispatch("updateFilter", { results: filteredExercises });
  }

  function filterExercises() {
    filteredExercises = exercises.filter((exercise) => {
      for (const [category, values] of activeFilters) {
        if (values.size === 0) continue;
        const result = exercise[category];
        const result_arr = Array.isArray(result) ? result : [result];
        if (!result_arr.some((item) => values.has(item.toString()))) {
          return false;
        }
      }
      return true;
    });
    searchExercises();
  }
</script>

<div class="menu sticky top-28 z-10 rounded-box bg-neutral p-4 shadow-xl">
  <div class="flex flex-col gap-4">
    <h2 class="menu-title text-neutral-content">
      <p>Filter</p>
    </h2>
    <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div class="flex flex-wrap gap-2 sm:flex-grow">
        {#each filters as [category, values]}
          <div class="dropdown dropdown-bottom">
            <div tabindex="0" role="button" class="btn btn-sm m-1">
              {capitalize(category.toString())}
            </div>
            <ul class="menu dropdown-content z-[50] w-52 rounded-box bg-base-100 p-2 shadow">
              {#each values as filter}
                <li>
                  <button
                    type="button"
                    on:click={() => updateActiveFilter(category, filter)}
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
          </div>
        {/each}
      </div>
      <div class="flex w-full items-center gap-2 sm:w-auto sm:flex-grow">
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
        <button
          title="Reset Filters"
          on:click={resetFilter}
          class="material-symbols-outlined btn btn-primary btn-sm {isResetDisabled ? 'btn-disabled' : 'btn-error'}"
          disabled={isResetDisabled}
        >
          close
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  @media (max-width: 639px) {
    .menu > div > div {
      flex-direction: column;
    }
  }
</style>
