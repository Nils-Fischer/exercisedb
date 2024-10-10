<script lang="ts">
  import type { Exercise } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  export let exercise: Exercise;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click", { exercise });
  }
</script>

<button
  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:shadow-2xl"
  on:click={handleClick}
  on:keydown={(e) => e.key === "Enter" && handleClick()}
  aria-label={`View details for ${exercise.name}`}
>
  <div class="card-body">
    <h2 class="card-title">{exercise.name}</h2>
    <div class="flex flex-wrap space-x-1">
      <div class="badge">{exercise.level}</div>
      <div class="badge badge-primary">{exercise.category}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary">{exercise.mechanic}</div>
    </div>
    <div class="flex space-x-2">
      <div class="flex h-52 w-52 items-center justify-center bg-gray-200">
        <span>Loading...</span>
      </div>
    </div>
    <div class="grid grid-cols-auto-fit gap-4">
      <div class="badge badge-accent">{exercise.category}</div>
    </div>
  </div>
</button>
