<script lang="ts">
  import type { Exercise } from "../lib/types";

  export let workoutSplit: [number, Exercise[][]][];

  function getExerciseName(exercise: Exercise): string {
    return exercise.name;
  }

  function getEquipment(exercise: Exercise): string {
    return exercise.equipment;
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="mb-6 text-3xl font-bold">Your Custom Workout Plan</h1>

  {#each workoutSplit as [frequency, exercises], splitIndex}
    <div class="mb-8 rounded-lg bg-base-200 p-6 shadow-lg">
      <h2 class="mb-4 text-2xl font-semibold">
        Split {splitIndex + 1} - {frequency}x per week
      </h2>

      {#each exercises as exerciseGroup, groupIndex}
        <div class="mb-6">
          <h3 class="mb-2 text-xl font-medium">
            Exercise Group {groupIndex + 1}
          </h3>
          <ul class="list-disc pl-6">
            {#each exerciseGroup as exercise, exerciseIndex}
              <li class="mb-2">
                <span class="font-semibold">{getExerciseName(exercise)}</span>
                <ul class="mt-1 list-none pl-4">
                  <li>Equipment: {getEquipment(exercise)}</li>
                  <li>Primary Muscles: {exercise.primaryMuscles.join(", ")}</li>
                  <li>
                    Alternatives:
                    {#if exerciseGroup.length > 1}
                      <ul class="list-disc pl-6">
                        {#each exerciseGroup.slice(1) as altExercise}
                          <li>
                            {getExerciseName(altExercise)} ({getEquipment(
                              altExercise
                            )})
                          </li>
                        {/each}
                      </ul>
                    {:else}
                      None
                    {/if}
                  </li>
                </ul>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</div>
