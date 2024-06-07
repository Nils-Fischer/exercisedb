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
</script>

<div class="card bg-base-100 shadow-xl" style="width: 500px;">
  <div class="card-body">
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
      <div class="carousel-inner flex transition-transform duration-500">
        <div id="slide1" class="carousel-item relative w-full flex-shrink-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            alt="Exercise Image"
            class="w-full"
          />
          <div
            class="carousel-nav absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <a href="#slide4" class="btn btn-circle" on:click={() => slideTo(3)}
              >❮</a
            >
            <a href="#slide2" class="btn btn-circle" on:click={() => slideTo(1)}
              >❯</a
            >
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full flex-shrink-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            alt="Exercise Image"
            class="w-full"
          />
          <div
            class="carousel-nav absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <a href="#slide1" class="btn btn-circle" on:click={() => slideTo(0)}
              >❮</a
            >
            <a href="#slide3" class="btn btn-circle" on:click={() => slideTo(2)}
              >❯</a
            >
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full flex-shrink-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
            alt="Exercise Image"
            class="w-full"
          />
          <div
            class="carousel-nav absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <a href="#slide2" class="btn btn-circle" on:click={() => slideTo(1)}
              >❮</a
            >
            <a href="#slide4" class="btn btn-circle" on:click={() => slideTo(3)}
              >❯</a
            >
          </div>
        </div>
        <div id="slide4" class="carousel-item relative w-full flex-shrink-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            alt="Exercise Image"
            class="w-full"
          />
          <div
            class="carousel-nav absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <a href="#slide3" class="btn btn-circle" on:click={() => slideTo(2)}
              >❮</a
            >
            <a href="#slide1" class="btn btn-circle" on:click={() => slideTo(0)}
              >❯</a
            >
          </div>
        </div>
      </div>
    </div>

    <h3 class="text-xl font-bold">Beschreibung</h3>
    <p>{exercise.instructions}</p>
  </div>
  <div class="mt-4 grid grid-cols-1 gap-4">
    {#each exercise.primaryMuscles as muscle}
      <div class="badge badge-accent">{muscle}</div>
    {/each}
    {#each exercise.secondaryMuscles as muscle}
      <div class="badge badge-ghost">{muscle}</div>
    {/each}
  </div>
</div>

<style>
  .carousel-item {
    width: 100%;
  }
</style>
