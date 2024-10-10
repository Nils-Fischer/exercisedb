<script lang="ts">
  import type { PageData } from "./$types";
  import ExercisePage from "$lib/components/ExercisePage.svelte";

  export let data: PageData;
</script>

<main class="container mx-auto p-4">
  <ExercisePage exercises={data.exercises} filters={data.filters} />
</main>
