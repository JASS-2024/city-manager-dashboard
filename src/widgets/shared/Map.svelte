<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  import {Tile, map} from "$lib/Utils"

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();


  let maxWidth = Math.max(...map.map((row) => row.length))
  let maxHeight = map.length

  let images = new Map<Tile, HTMLImageElement>();

  onMount(() => {
    loadImages().then(refreshMapBackground);
    const resizeObserver = new ResizeObserver(entries => {
      refreshMapBackground()
    });
    resizeObserver.observe(canvas);
    return () => resizeObserver.unobserve(canvas);
  });

  // Preload all tile images
  async function loadImages() {
    const tileTypes = Object.values(Tile);
    const loadImage = (imageType: Tile) => new Promise<[Tile, HTMLImageElement]>((resolve) => {
      const img = new Image();
      img.onload = () => resolve([imageType, img]);
      img.src = `assets/tiles/${imageType}.png`; // Adjust path as necessary
    })

    const imagePromises = tileTypes.map(loadImage);
    const loadedImages = await Promise.all(imagePromises);

    // Store loaded images in an object for easy access
    loadedImages.forEach(([imageType, img]) => {
      images.set(imageType, img);
    });
  }

  function refreshMapBackground() {
    if (canvas.getContext) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      let tileSize = Math.min(canvas.clientHeight / maxHeight, canvas.clientWidth / maxWidth);
      dispatch('send-data', tileSize);
      const ctx = canvas.getContext('2d');
      drawMapBackground(ctx!, map, tileSize);
    }
  }

  function drawMapBackground(ctx: CanvasRenderingContext2D, map : Tile[][], tileSize: number) {
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const img = images.get(tile);
        if (img) {
          ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
        }
      });
    });
  }
</script>

<canvas id="map" bind:this={canvas}></canvas>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
