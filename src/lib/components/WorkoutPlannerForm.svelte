<script lang="ts">
  import { onMount } from "svelte";
  import { Level, TrainingGoal, type Exercise, type ExercisePlan } from "$lib/types";
  import CustomWorkout from "./CustomWorkout.svelte";
  import { createSplit } from "$lib/utils";

  export let exercises: Exercise[];

  let frequency = 4;
  let duration = 60;
  let level: Level = Level.Beginner;
  let isLoading = false;
  let progress: number = 0;
  let goal: TrainingGoal = TrainingGoal.Hypertrophy;
  let customSplit: ExercisePlan[] = [];

  onMount(() => {
    const restDayHint = document.getElementById("restDayHint");
    updateFrequency(frequency, restDayHint);
  });

  function updateFrequency(value: number, restDayHint: HTMLElement | null) {
    if (value === 7 && restDayHint) {
      restDayHint.classList.remove("hidden");
    } else if (restDayHint) {
      restDayHint.classList.add("hidden");
    }
  }

  function handleFrequencyChange(event: Event) {
    const target = event.target as HTMLInputElement;
    frequency = parseInt(target.value);
    const restDayHint = document.getElementById("restDayHint");
    updateFrequency(frequency, restDayHint);
  }

  function handleDurationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    duration = parseInt(target.value);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    progress = 0;

    const interval = setInterval(
      () => {
        progress += Math.pow(20, Math.random()) - 1;
        if (progress >= 100) {
          clearInterval(interval);
          isLoading = false;
          customSplit = createSplit(exercises, frequency, duration, level, goal);
        }
      },
      ((Math.random() * 1000) % 300) + 100
    );
  }
</script>

<main class="container m-auto px-4">
  {#if customSplit.length === 0}
    <form on:submit={handleSubmit}>
      <h1 class="text-neutral-content-content mb-6 text-left text-3xl font-bold">Workout Planner</h1>
      <div class="m-2 space-y-2">
        <label class="text-xl font-bold text-neutral-content" for="frequency">
          1. Wie oft hast du vor zu trainieren?
        </label>
        <input
          type="range"
          class="range range-error"
          min="1"
          max="7"
          bind:value={frequency}
          on:input={handleFrequencyChange}
          disabled={isLoading}
        />
        <div class="mt-3 text-center">
          <span class="text-neutral-content-content text-2xl">{frequency}x</span>
          <span class="text-neutral-content">Woche</span>
        </div>
        <div id="restDayHint" class="mt-2 hidden text-center text-error">
          Es wird empfohlen, mindestens 1 Ruhetag pro Woche zu haben.
        </div>
      </div>

      <div class="m-2 space-y-2">
        <label class="text-xl font-bold text-neutral-content" for="duration">
          2. Wie lange hast du vor zu trainieren?
        </label>
        <input
          type="range"
          class="range range-error"
          min="30"
          max="180"
          step="10"
          bind:value={duration}
          on:input={handleDurationChange}
          disabled={isLoading}
        />
        <div class="mt-3 text-center">
          <span class="text-2xl text-neutral-content">{duration} min</span>
        </div>
      </div>

      <div class="m-2 mb-10">
        <label class="text-xl font-bold text-neutral-content" for="level"> 3. Wie viel Erfahrung hast du? </label>
        <div class="mt-3 flex space-x-4">
          <input
            type="radio"
            id="beginner"
            name="level"
            value={Level.Beginner}
            class="radio"
            checked={true}
            bind:group={level}
            disabled={isLoading}
          />
          <label for="beginner">Anfänger</label>

          <input
            type="radio"
            id="intermediate"
            name="level"
            value={Level.Intermediate}
            class="radio"
            bind:group={level}
            disabled={isLoading}
          />
          <label for="intermediate">Fortgeschritten</label>

          <input
            type="radio"
            id="expert"
            name="level"
            value={Level.Expert}
            class="radio"
            bind:group={level}
            disabled={isLoading}
          />
          <label for="expert">Experte</label>
        </div>
      </div>

      <div class="m-2 mb-10">
        <label class="text-xl font-bold text-neutral-content" for="goal"> 4. Was ist dein Ziel? </label>
        <div class="mt-3 flex space-x-4">
          <input
            type="radio"
            id="hyperthrophy"
            name="goal"
            value={TrainingGoal.Hypertrophy}
            class="radio"
            checked={true}
            bind:group={goal}
            disabled={isLoading}
          />
          <label for="hyperthrophy">Muskeln</label>

          <input
            type="radio"
            id="strength"
            name="goal"
            value={TrainingGoal.Strength}
            class="radio"
            bind:group={goal}
            disabled={isLoading}
          />
          <label for="strength">Kraft</label>

          <input
            type="radio"
            id="endurance"
            name="goal"
            value={TrainingGoal.Endurance}
            class="radio"
            bind:group={goal}
            disabled={isLoading}
          />
          <label for="endurance">Ausdauer</label>
        </div>
      </div>

      {#if isLoading}
        <div class="justify-center text-center">
          <progress class="progress w-56" value={progress} max="100"></progress>
          <p>Generating your workout plan...</p>
        </div>
      {:else}
        <div class="text-center">
          <button
            type="submit"
            class="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      {/if}
    </form>
  {:else}
    <CustomWorkout workoutSplit={customSplit} />
  {/if}
</main>
