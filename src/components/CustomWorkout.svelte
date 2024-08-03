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
            evt.preventDefault();
            container.scrollLeft += evt.deltaY;
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
      <div class="horizontal-scroll scrollbar-hidden overflow-x-auto">
        <div class="flex space-x-4 pb-4">
          {#each exercises as alternatives}
            <div class="w-64 flex-none">
              <ExerciseCard exercise={alternatives[0]} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>
