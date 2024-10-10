<script lang="ts">
  import WorkoutPlannerForm from "$lib/components/WorkoutPlannerForm.svelte";

  export let data;
</script>

<WorkoutPlannerForm exercises={data.exercises} />
