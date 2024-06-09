<!-- src/components/ExerciseGrid.svelte -->
<script lang="ts">
  import ExerciseCard from './ExerciseCard.svelte';
  import type { Exercise } from '../lib/types';

  export let exercises: Exercise[];
</script>

<div class="grid grid-cols-auto-fit gap-4">
  {#each exercises as exercise}
    <ExerciseCard {exercise} />
  {/each}
</div>
