<!-- src/components/ExerciseCard.svelte -->
<script lang="ts">
  import type { Exercise } from '../lib/types';
  import { onMount } from 'svelte';

  export let exercise: Exercise;
  let imageLoadErrors: boolean[] = [];
  let currentSlide = 0;

  function slideTo(index: number) {
    currentSlide = index;
    const innerCarousel = document.querySelector(
      '.carousel-inner'
    ) as HTMLElement;
    if (innerCarousel) {
      innerCarousel.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  const goTo = (event: Event) => {
    event.preventDefault();
    const btn = event.currentTarget as HTMLSelectElement;
    const carousel = btn.parentElement!.parentElement!.parentElement!;
    // EQUIVALENT: const carousel = document.querySelector('.carousel')
    const href = btn.getAttribute('href')!;
    const target = carousel.querySelector<HTMLDivElement>(href)!;
    const left = target.offsetLeft;
    carousel.scrollTo({ left: left });
  };
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
    <div class="carousel relative w-full overflow-hidden">
      <div id="slide1" class="carousel-item relative w-full">
        <img
          src="https://training.fit/wp-content/uploads/2019/07/bankdruecken-kurzhantel-flachbank.png"
          alt="Exercise Image"
          class="w-full"
        />
        <div
          class="carousel-nav absolute left-3 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity duration-300 hover:opacity-100"
        >
          <a on:click={goTo} href="#slide4" class="btn btn-circle">❮</a>
          <a on:click={goTo} href="#slide2" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" class="carousel-item relative w-full">
        <img
          alt="alt"
          src="https://s3.ap-south-1.amazonaws.com/litekart.in/img/untitled-360-190px-1500-380px-vzlc6ffmy4ej.png"
          class="w-full"
        />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a on:click={goTo} href="#slide1" class="btn btn-circle">❮</a>
          <a on:click={goTo} href="#slide3" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" class="carousel-item relative w-full">
        <img
          alt="alt"
          src="https://s3.ap-south-1.amazonaws.com/litekart.in/img/untitled-360-190px-1500-380px-vzlc6ffmy4ej.png"
          class="w-full"
        />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a on:click={goTo} href="#slide2" class="btn btn-circle">❮</a>
          <a on:click={goTo} href="#slide4" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide4" class="carousel-item relative w-full">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video class="w-full" controls>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a on:click={goTo} href="#slide3" class="btn btn-circle">❮</a>
          <a on:click={goTo} href="#slide1" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
    <h3 class="text-xl font-bold">Beschreibung</h3>
    <p>{exercise.instructions}</p>
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

<style>
  .carousel-item {
    width: 100%;
  }
</style>
