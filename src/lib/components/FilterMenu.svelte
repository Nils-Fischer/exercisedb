<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Exercise, Filters } from "$lib/types";
  import { capitalize } from "$lib/utils";
  import { createEventDispatcher, onMount } from "svelte";
  import { X, RotateCcw, Search } from "lucide-svelte";

  export let filters: Filters;

  let searchQuery = "";
  let activeFilters = new Map<keyof Filters, string[]>();
  let openDropdown: keyof Filters | null = null;

  const dispatch = createEventDispatcher<{ search: string }>();

  $: {
    activeFilters = new Map();
    (Object.keys(filters) as Array<keyof Filters>).forEach((category) => {
      const paramValues = $page.url.searchParams.getAll(category);
      if (paramValues.length > 0) {
        activeFilters.set(category, paramValues);
      }
    });

    const openParam = $page.url.searchParams.get("open") as keyof Filters | null;
    openDropdown = openParam;
  }

  $: isResetDisabled = activeFilters.size === 0 && searchQuery === "";

  function updateActiveFilter(category: keyof Filters, value: string) {
    const url = new URL($page.url);
    const currentValues = url.searchParams.getAll(category);

    if (currentValues.includes(value)) {
      url.searchParams.delete(category, value);
    } else {
      url.searchParams.append(category, value);
    }

    url.searchParams.set("open", category);
    goto(url.toString(), { replaceState: true });
  }

  function resetFilter() {
    const url = new URL($page.url);
    Object.keys(filters).forEach((category) => {
      url.searchParams.delete(category);
    });
    url.searchParams.delete("open");
    openDropdown = null;
    goto(url.toString());
  }

  function resetSearch() {
    searchQuery = "";
    dispatch("search", "");
  }

  function handleSearch() {
    dispatch("search", searchQuery);
  }

  function toggleDropdown(category: keyof Filters) {
    const url = new URL($page.url);
    if (openDropdown === category) {
      url.searchParams.delete("open");
      openDropdown = null;
    } else {
      url.searchParams.set("open", category);
      openDropdown = category;
    }
    goto(url.toString(), { replaceState: true });
  }

  // Close dropdown when clicking outside
  let dropdownContainer: HTMLDivElement;
  function handleClickOutside(event: MouseEvent) {
    if (openDropdown !== null && dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
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
        {#each Object.entries(filters) as [category, values]}
          {@const typedCategory = category as keyof Filters}
          <div
            class="dropdown dropdown-bottom {openDropdown === typedCategory ? 'dropdown-open' : ''}"
            bind:this={dropdownContainer}
          >
            <button tabindex="0" class="btn btn-sm m-1" on:click|stopPropagation={() => toggleDropdown(typedCategory)}>
              {capitalize(category)}
            </button>
            {#if openDropdown === typedCategory}
              <ul class="menu dropdown-content z-[50] w-52 rounded-box bg-base-100 p-2 shadow">
                {#each values as filter}
                  <li>
                    <button
                      type="button"
                      on:click|stopPropagation={() => updateActiveFilter(typedCategory, filter)}
                      class="btn btn-ghost btn-sm justify-start rounded-none [--btn-focus-scale:1] {activeFilters
                        .get(typedCategory)
                        ?.includes(filter)
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
        <button
          title="Reset Filters"
          on:click={resetFilter}
          class="btn btn-primary btn-sm m-1 {activeFilters.size === 0 ? 'btn-disabled' : 'btn-error'}"
          disabled={isResetDisabled}
          aria-label="Reset Filters"
        >
          <RotateCcw size="15" />
        </button>
      </div>
      <div class="flex w-full items-center gap-2 sm:w-auto sm:flex-grow">
        <div class="flex-grow">
          <label class="input input-bordered flex w-full items-center gap-2">
            <input type="text" class="grow" placeholder="Search" bind:value={searchQuery} on:keyup={handleSearch} />
            {#if searchQuery !== ""}
              <button
                type="button"
                class="group btn btn-ghost btn-sm p-0 hover:bg-transparent"
                on:click={resetSearch}
                aria-label="Search"
              >
                <div class="transition-transform duration-200 ease-in-out group-hover:scale-125">
                  <X size="15" />
                </div>
              </button>
            {/if}
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
