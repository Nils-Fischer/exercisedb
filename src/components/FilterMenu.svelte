<!-- src/components/FilterMenu.svelte -->
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
</script>

<ul class="menu sticky top-28 w-56 rounded-box bg-neutral-content shadow-xl">
  <h2 class="menu-title">Filters</h2>
  {#each filters as [category, values]}
    <li>
      <details>
        <summary>{capitalize(category.toString())}</summary>
        <ul>
          {#each values as filter}
            <li>
              <button
                type="button"
                on:click={() => toggleFilter(category, filter)}
                class="{activeFilters.get(category)?.has(filter) ? 'active' : ''} rounded-none"
                >{capitalize(filter)}</button
              >
            </li>
          {/each}
        </ul>
      </details>
    </li>
  {/each}
</ul>
