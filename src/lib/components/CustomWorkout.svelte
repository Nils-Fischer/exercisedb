<script lang="ts">
  import { onMount } from "svelte";
  import type { Exercise, ExercisePlan, ExerciseWithAlternatives } from "$lib/types";
  import ExerciseCard from "./ExerciseCard.svelte";
  import ExerciseCardWithAlternatives from "./ExerciseCardWithAlternatives.svelte";
  import { fade } from "svelte/transition"; // Import fade transition

  export let workoutSplit: ExercisePlan[];

  let selectedAlternative: ExerciseWithAlternatives | null = null;
  let viewMode: "card" | "list" = "card";

  function triggerAlternatives(exercise: ExerciseWithAlternatives) {
    selectedAlternative = selectedAlternative === null ? exercise : null;
  }

  function toggleView(mode: "card" | "list") {
    viewMode = mode;
  }

  function changePrimaryExercise(exercise: Exercise) {
    if (selectedAlternative != null) {
      selectedAlternative.alternatives = selectedAlternative.alternatives.filter((e) => e != exercise);
      selectedAlternative.alternatives.push(selectedAlternative.primaryExercise);
      selectedAlternative.primaryExercise = exercise;
      workoutSplit = workoutSplit;
    }
  }

  onMount(() => {
    const scrollContainers = document.querySelectorAll(".horizontal-scroll");
    scrollContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.addEventListener(
          "wheel",
          (evt: WheelEvent) => {
            if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) return;

            evt.preventDefault();
            const cardWidth = 256;
            const scrollAmount = Math.sign(evt.deltaY) * cardWidth;

            const maxScroll = container.scrollWidth - container.clientWidth;
            const newScrollPosition = Math.max(0, Math.min(container.scrollLeft + scrollAmount, maxScroll));

            container.scrollTo({
              left: newScrollPosition,
              behavior: "smooth",
            });
          },
          { passive: false }
        );
      }
    });
  });
</script>

<div class="container mx-auto p-6">
  <h1 class="mb-8 text-center text-3xl font-bold">Dein Eigener Trainingsplan</h1>

  <!-- View Toggle Links -->
  <div class="mb-6 flex justify-center">
    <a href="#" class={`view-toggle-link ${viewMode === "card" ? "active" : ""}`} on:click={() => toggleView("card")}>
      Plan
    </a>
    <a href="#" class={`view-toggle-link ${viewMode === "list" ? "active" : ""}`} on:click={() => toggleView("list")}>
      Liste
    </a>
  </div>

  {#each workoutSplit as split, splitIndex}
    <div class="mb-12 rounded-lg border border-base-300 bg-base-200 p-4 shadow-lg">
      <h2 class="border-base- mb-6 border-b-2 pb-2 text-2xl font-bold">
        {split.name} - {split.frequency}x pro Woche
      </h2>

      {#if viewMode === "card"}
        <!-- Card View -->
        <div class="horizontal-scroll snap-container overflow-x-auto scrollbar-hidden">
          <div class="card-wrapper mb-8 flex">
            {#each split.exercises as exercise}
              <div class="snap-item stack w-auto flex-none px-2">
                <ExerciseCardWithAlternatives {exercise} on:showAlternatives={() => triggerAlternatives(exercise)} />
                {#each exercise.alternatives as alternative}
                  <ExerciseCard exercise={alternative} />
                {/each}
              </div>
            {/each}
            <div class="snap-item w-8 flex-none"></div>
          </div>
        </div>
        {#if selectedAlternative !== null}
          <div class="alternatives-wrapper mt-6" transition:fade>
            <h3 class="mb-4 border-t-2 border-gray-300 pt-2 text-xl font-bold">Alternative Übungen</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {#each selectedAlternative.alternatives as alternative}
                <ExerciseCard exercise={alternative} on:click={() => changePrimaryExercise(alternative)} />
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <!-- List View -->
        <ol class="list-inside list-decimal pl-5">
          {#each split.exercises as exercise}
            <li class="mb-2 text-lg">
              {exercise.primaryExercise.name} - {exercise.sets}
              {exercise.sets > 1 ? "Sätze" : "Satz"},
              {exercise.repetitions.join("-")}
              {exercise.repetitions.length > 1 ? "Wiederholungen" : "Wiederholung"}
            </li>
          {/each}
        </ol>
      {/if}
    </div>
  {/each}
</div>
<div class=" bottom-0 left-0 right-0 z-30 flex justify-center p-4">
  <button class="btn btn-success">Jetzt Speichern</button>
</div>

<style>
  .view-toggle-link {
    display: inline-block;
    padding: 0.125rem 0.5rem; /* Reduced padding */
    border-radius: 9999px;
    background-color: #f3f4f6;
    color: #1d4ed8; /* Blue color */
    text-decoration: none;
    font-size: 0.875rem; /* Smaller font size */
    font-weight: 500;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .view-toggle-link:hover {
    background-color: #e0e7ff; /* Light blue on hover */
    color: #1e40af; /* Darker blue on hover */
  }

  .view-toggle-link.active {
    background-color: #bfdbfe; /* Light blue for active state */
    color: #1d4ed8; /* Blue color for active state */
    font-weight: 600;
  }

  .snap-container {
    scroll-snap-type: x mandatory;
    scroll-behavior: auto;
  }
  .snap-item {
    scroll-snap-align: start;
  }
  .card-wrapper {
    width: calc(100% + 0.5rem);
  }
  .alternatives-wrapper {
    margin-top: 1rem;
  }
</style>
