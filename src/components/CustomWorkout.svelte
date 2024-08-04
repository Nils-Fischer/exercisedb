<script lang="ts">
  import { onMount } from "svelte";
  import type { Exercise } from "../lib/types";
  import ExerciseCard from "./ExerciseCard.svelte";

  export let workoutSplit: [number, Exercise[][]][];

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
            const newScrollPosition = Math.max(
              0,
              Math.min(container.scrollLeft + scrollAmount, maxScroll)
            );

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
  <h1 class="mb-6 text-3xl font-bold">Dein Eigener Trainingsplan</h1>

  {#each workoutSplit as [frequency, exercises], splitIndex}
    <div class="mb-10">
      <h2 class="mb-4 text-2xl font-bold">
        Split #{splitIndex + 1} - {frequency}x pro Woche
      </h2>
      <div
        class="horizontal-scroll snap-container overflow-x-auto scrollbar-hidden"
      >
        <div class="card-wrapper mb-8 flex">
          {#each exercises as alternatives}
            <div class="snap-item w-auto flex-none px-4">
              <ExerciseCard exercise={alternatives[0]} />
            </div>
          {/each}
          <div class="snap-item w-16 flex-none"></div>
        </div>
      </div>
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
</style>
