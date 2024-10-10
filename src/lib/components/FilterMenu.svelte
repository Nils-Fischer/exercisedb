<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SearchIcon from "$lib/assets/searchIcon.svelte";
  import type { Exercise } from "$lib/types";
  import { capitalize } from "$lib/utils";
  import { onMount } from "svelte";

  export let filters: Map<keyof Exercise, Set<string>>;

  let searchQuery = "";
  let activeFilters = new Map<keyof Exercise, Set<string>>();
  let openDropdown: keyof Exercise | null = null;

  $: {
    activeFilters = new Map();
    for (const [category, values] of filters) {
      const paramValues = $page.url.searchParams.getAll(category.toString());
      if (paramValues.length > 0) {
        activeFilters.set(category, new Set(paramValues));
      }
    }
    searchQuery = $page.url.searchParams.get("search") || "";
    const openParam = $page.url.searchParams.get("open");
    openDropdown = openParam as keyof Exercise | null;
  }

  $: isResetDisabled = activeFilters.size === 0 && searchQuery === "";

  function updateActiveFilter(category: keyof Exercise, value: string) {
    const url = new URL($page.url);
    const currentValues = url.searchParams.getAll(category.toString());

    if (currentValues.includes(value)) {
      url.searchParams.delete(category.toString(), value);
    } else {
      url.searchParams.append(category.toString(), value);
    }

    // Keep the current dropdown open
    url.searchParams.set("open", category.toString());

    goto(url.toString(), { replaceState: true });
  }

  function resetFilter() {
    const url = new URL($page.url);
    for (const [category] of filters) {
      url.searchParams.delete(category.toString());
    }
    url.searchParams.delete("search");
    url.searchParams.delete("open");
    searchQuery = "";
    openDropdown = null;
    goto(url.toString());
  }

  function handleSearch() {
    const url = new URL($page.url);
    if (searchQuery) {
      url.searchParams.set("search", searchQuery);
    } else {
      url.searchParams.delete("search");
    }
    goto(url.toString());
  }

  function toggleDropdown(category: keyof Exercise) {
    const url = new URL($page.url);
    if (openDropdown === category) {
      url.searchParams.delete("open");
      openDropdown = null;
    } else {
      url.searchParams.set("open", category.toString());
      openDropdown = category;
    }
    goto(url.toString(), { replaceState: true });
  }

  // Close dropdown when clicking outside
  let dropdownContainer: HTMLDivElement;
  function handleClickOutside(event: MouseEvent) {
    if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
      const url = new URL($page.url);
      url.searchParams.delete("open");
      goto(url.toString(), { replaceState: true });
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div class="menu sticky top-28 z-10 rounded-box bg-neutral p-4 shadow-xl">
  <div class="flex flex-col gap-4">
    <h2 class="menu-title text-neutral-content">
      <p>Filter</p>
    </h2>
    <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div class="flex flex-wrap gap-2 sm:flex-grow">
        {#each filters as [category, values]}
          <div
            class="dropdown dropdown-bottom {openDropdown === category ? 'dropdown-open' : ''}"
            bind:this={dropdownContainer}
          >
            <button tabindex="0" class="btn btn-sm m-1" on:click|stopPropagation={() => toggleDropdown(category)}>
              {capitalize(category.toString())}
            </button>
            {#if openDropdown === category}
              <ul class="menu dropdown-content z-[50] w-52 rounded-box bg-base-100 p-2 shadow">
                {#each values as filter}
                  <li>
                    <button
                      type="button"
                      on:click|stopPropagation={() => updateActiveFilter(category, filter)}
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
            {/if}
          </div>
        {/each}
      </div>
      <div class="flex w-full items-center gap-2 sm:w-auto sm:flex-grow">
        <div class="flex-grow">
          <label class="input input-bordered flex w-full items-center gap-2">
            <input
              type="text"
              class="grow"
              placeholder="Search"
              bind:value={searchQuery}
              on:keyup={(e) => e.key === "Enter" && handleSearch()}
            />
            <button type="button" class="btn btn-ghost btn-sm p-0" on:click={handleSearch} aria-label="Search">
              <SearchIcon />
            </button>
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
