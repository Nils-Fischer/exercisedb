<script lang="ts">
  import { onMount } from "svelte";
  import type { Exercise, ExercisePlan } from "../lib/types";
  import ExerciseCard from "./ExerciseCard.svelte";
  import ExerciseCardWithAlternatives from "./ExerciseCardWithAlternatives.svelte";
  import { fade } from "svelte/transition"; // Import fade transition

  export let workoutSplit: ExercisePlan[];

  let alternatives: Exercise[] | null = null;

  function triggerAlternatives(event: CustomEvent<{ alternatives: Exercise[] }>) {
    const exerciseAlternatives = event.detail.alternatives;
    alternatives = alternatives === null ? exerciseAlternatives : null;
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

<div class="container mx-auto p-4">
  <h1 class="mb-6 text-center text-3xl font-bold">Dein Eigener Trainingsplan</h1>

  {#each workoutSplit as split, splitIndex}
    <div class="mb-10">
      <h2 class="mb-4 text-2xl font-bold">
        {split.name} - {split.frequency}x pro Woche
      </h2>
      <div class="horizontal-scroll snap-container overflow-x-auto scrollbar-hidden">
        <div class="card-wrapper mb-8 flex">
          {#each split.exercises as exercise}
            <div class="snap-item stack w-auto flex-none px-4">
              <ExerciseCardWithAlternatives {exercise} on:showAlternatives={triggerAlternatives} />
              {#each exercise.alternatives as alternative}
                <ExerciseCard exercise={alternative} />
              {/each}
            </div>
          {/each}
          <div class="snap-item w-16 flex-none"></div>
        </div>
      </div>

      {#if alternatives !== null}
        <div class="alternatives-wrapper mt-4" transition:fade>
          <h3 class="mb-2 text-xl font-bold">Alternative Übungen</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {#each alternatives as alternative}
              <ExerciseCard exercise={alternative} />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .snap-container {
    scroll-snap-type: x mandatory;
    scroll-behavior: auto;
  }
  .snap-item {
    scroll-snap-align: start;
  }
  .card-wrapper {
    width: calc(100% + 1rem);
  }
  .alternatives-wrapper {
    margin-top: 1rem;
  }
</style>
