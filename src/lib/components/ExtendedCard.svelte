<script lang="ts">
  import type { Exercise, MediaItem } from "$lib/types";
  import MediaCarousel from "./MediaCarousel.svelte";

  export let exercise: Exercise;

  // TODO remove
  const media: MediaItem[] = [
    {
      type: "image",
      src: "https://training.fit/wp-content/uploads/2019/07/bankdruecken-kurzhantel-flachbank.png",
    },
    {
      type: "image",
      src: "https://s3.ap-south-1.amazonaws.com/litekart.in/img/untitled-360-190px-1500-380px-vzlc6ffmy4ej.png",
    },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  ];
</script>

<div class="card w-2/5 bg-base-100 shadow-2xl">
  <div class="card-body pl-7">
    <h2 class="card-title">{exercise.name}</h2>
    <div class="flex flex-wrap space-x-1">
      <div class="badge">{exercise.level}</div>
      <div class="badge badge-neutral">{exercise.category}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary">{exercise.mechanic}</div>
      <div class="badge badge-primary">{exercise.equipment}</div>
    </div>
    <MediaCarousel mediaItems={media} />

    <h3 class="text-xl font-bold">Beschreibung</h3>
    <p>{exercise.instructions.join(" ")}</p>
    <div>
      <h5 class="pt-3 text-xl font-bold">Muskel:</h5>
    </div>
    <div class="mt-4 flex flex-wrap space-x-2">
      {#each exercise.primaryMuscles as muscle}
        <div class="badge badge-accent">{muscle}</div>
      {/each}
      {#each exercise.secondaryMuscles as muscle}
        <div class="badge badge-ghost">{muscle}</div>
      {/each}
    </div>
  </div>
</div>
