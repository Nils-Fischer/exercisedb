<script lang="ts">
  import type { MediaItem } from '../lib/types';
  import { mod } from '../lib/utils';

  export let mediaItems: MediaItem[] = [];

  function goTo(event: Event) {
    event.preventDefault();
    const btn = event.currentTarget as HTMLAnchorElement;
    const carousel = btn.closest('.carousel') as HTMLElement;
    const href = btn.getAttribute('href')!;
    const target = carousel.querySelector<HTMLDivElement>(href)!;
    const left = target.offsetLeft;
    carousel.scrollTo({ left: left, behavior: 'smooth' });
  }

  mediaItems = mediaItems.sort((a, b) => {
    if (a.type === 'video' && b.type === 'image') {
      return -1;
    } else if (a.type === 'image' && b.type === 'video') {
      return 1;
    } else {
      return 0;
    }
  });
</script>

<div class="carousel relative w-full overflow-hidden">
  <div class="carousel-inner flex transition-transform duration-500">
    {#each mediaItems as media, index}
      <div id={`slide${index}`} class="carousel-item relative w-full flex-none">
        {#if media.type === 'image'}
          <img src={media.src} alt={`Slide ${index}`} class="w-full" />
        {:else if media.type === 'video'}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video class="w-full" controls>
            <source src={media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        {/if}
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a
            on:click={goTo}
            href={`#slide${mod(index - 1, mediaItems.length)}`}
            class="btn btn-circle">❮</a
          >
          <a
            on:click={goTo}
            href={`#slide${mod(index + 1, mediaItems.length)}`}
            class="btn btn-circle">❯</a
          >
        </div>
      </div>
    {/each}
  </div>
</div>
