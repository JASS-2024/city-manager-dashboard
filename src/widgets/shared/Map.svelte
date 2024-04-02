<script lang="ts">
  import TestWidget from "../TestWidget.svelte";

  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  enum Tile {
    RoadVertical = 'RoadVertical',
    RoadHorizontal = "RoadHorizontal",
    Blank = "Blank",
    CurveBL = "CurveBL",
    CurveBR = "CurveBR",
    CurveTR = "CurveTR",
    CurveTL = "CurveTL",
    GarageBottom = "GarageBottom",
  }

  let map = [
    [
      Tile.CurveBR,
      Tile.RoadHorizontal,
      Tile.RoadHorizontal,
      Tile.RoadHorizontal,
      Tile.Blank,
      Tile.Blank,
      Tile.Blank,
    ],
    [
      Tile.RoadHorizontal,
      Tile.GarageBottom,
      Tile.GarageBottom,
      Tile.GarageBottom,
      Tile.Blank,
      Tile.Blank,
      Tile.Blank,
    ],
    [
      Tile.CurveTR,
      Tile.RoadHorizontal,
      Tile.RoadHorizontal,
      Tile.RoadHorizontal,
      Tile.CurveTL,
    ],
  ];

  let maxWidth = Math.max(...map.map((row) => row.length))
  console.log(maxWidth)
  let maxHeight = map.length
  console.log(maxHeight)

  let images = new Map<Tile, HTMLImageElement>();

  onMount(async () => {
    let tileSize = Math.min(canvas.clientHeight / maxHeight, canvas.clientWidth / maxWidth) / 3;

    
    console.log(tileSize)
    await loadImages();
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      drawMap(ctx!, map, tileSize);
    }
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

  function drawMap(ctx: CanvasRenderingContext2D, map : Tile[][], tileSize: number) {
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

<div>
  <canvas id="map" bind:this={canvas}></canvas>
</div>


<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
