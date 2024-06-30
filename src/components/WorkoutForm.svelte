<script lang="ts">
  import { onMount } from 'svelte';

  let frequency = 4;
  let duration = 60;
  let goal = '';
  let subGoal = '';

  onMount(() => {
    const restDayHint = document.getElementById('restDayHint');
    updateFrequency(frequency, restDayHint);
  });

  function updateFrequency(value: number, restDayHint: HTMLElement | null) {
    if (value === 7 && restDayHint) {
      restDayHint.classList.remove('hidden');
    } else if (restDayHint) {
      restDayHint.classList.add('hidden');
    }
  }

  function handleFrequencyChange(event: Event) {
    const target = event.target as HTMLInputElement;
    frequency = parseInt(target.value);
    const restDayHint = document.getElementById('restDayHint');
    updateFrequency(frequency, restDayHint);
  }

  function handleDurationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    duration = parseInt(target.value);
  }
</script>

<main
  class="container mx-auto rounded-lg bg-gray-100 p-4 text-gray-900 shadow-lg"
>
  <h1 class="mb-6 text-3xl font-bold text-blue-700">Workout Planner</h1>

  <form class="space-y-8 rounded-lg bg-white p-6 shadow-md">
    <!-- Training Frequency -->
    <div class="space-y-2">
      <label class="text-xl font-bold text-blue-600" for="frequency">
        1. Wie oft hast du vor zu trainieren?
      </label>
      <input
        type="range"
        id="frequency"
        name="frequency"
        min="1"
        max="7"
        bind:value={frequency}
        on:input={handleFrequencyChange}
        class="mt-2 w-full"
      />
      <div class="mt-2 text-center">
        <span class="text-2xl text-gray-600">{frequency}x</span>
        <span class="text-gray-700">Woche</span>
      </div>
      <div id="restDayHint" class="mt-2 hidden text-center text-red-500">
        Es wird empfohlen, mindestens 1 Ruhetag pro Woche zu haben.
      </div>
    </div>

    <!-- Training Duration -->
    <div class="space-y-2">
      <label class="text-xl font-bold text-blue-600" for="duration">
        2. Wie lange hast du vor zu trainieren?
      </label>
      <input
        type="range"
        id="duration"
        name="duration"
        min="30"
        max="180"
        step="10"
        bind:value={duration}
        on:input={handleDurationChange}
        class="mt-2 w-full"
      />
      <div class="mt-2 text-center">
        <span class="text-2xl text-gray-600">{duration} min</span>
      </div>
    </div>

    <!-- Goal -->
    <div class="space-y-2">
      <label class="text-xl font-bold text-blue-600"
        >3. Was ist dein Ziel?</label
      >
      <div class="mt-2 flex space-x-4">
        <label class="flex items-center">
          <input
            type="radio"
            name="goal"
            value="abnehmen"
            bind:group={goal}
            class="mr-2"
          />
          <span class="text-gray-700">Abnehmen</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            name="goal"
            value="zunehmen"
            bind:group={goal}
            class="mr-2"
          />
          <span class="text-gray-700">Zunehmen</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            name="goal"
            value="fitbleiben"
            bind:group={goal}
            class="mr-2"
          />
          <span class="text-gray-700">Fit bleiben</span>
        </label>
      </div>
    </div>
    <div class="space-y-2">
      <label class="text-xl font-bold text-blue-600"
        >4. Was ist dein Ziel?</label
      >
      <div class="mt-2 flex space-x-4">
        <label class="flex items-center">
          <input
            type="radio"
            name="subGoal"
            value="kraft"
            bind:group={subGoal}
            class="mr-2"
          />
          <span class="text-gray-700">Kraft</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            name="subGoal"
            value="muskel"
            bind:group={subGoal}
            class="mr-2"
          />
          <span class="text-gray-700">Muskel</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            name="subGoal"
            value="ausdauer"
            bind:group={subGoal}
            class="mr-2"
          />
          <span class="text-gray-700">Ausdauer</span>
        </label>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="text-center">
      <button
        type="submit"
        class="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  </form>
</main>
