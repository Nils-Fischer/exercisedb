<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Exercise } from "../lib/types";
  import { capitalize } from "../lib/utils";

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
  <h2 class="menu-title flex justify-between text-neutral-content">
    <p>Filter</p>
    <button title="Reset Filters" on:click={resetFilter} class="material-symbols-outlined btn btn-primary btn-sm">
      restart_alt
    </button>
  </h2>
  <ul class="flex flex-wrap gap-4">
    {#each filters as [category, values]}
      <li class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn m-1">{capitalize(category.toString())}</div>
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
</div>
