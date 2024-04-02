<script lang="ts">
  import TestWidget from "../TestWidget.svelte";

  enum Tile {
    RoadVertical,
    RoadHorizontal,
    Blank,
    CurveBL,
    CurveBR,
    CurveTR,
    CurveTL,
    GarageBottom,
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

  function visualize(tile: Tile) {
    switch (tile) {
      case Tile.RoadVertical:
        return "|";
      case Tile.RoadHorizontal:
        return "=";
      case Tile.Blank:
        return " ";
      case Tile.CurveBL:
        return "T";
      case Tile.CurveBR:
        return "T";
      case Tile.CurveTR:
        return "L";
      case Tile.CurveTL:
        return "2";
      case Tile.GarageBottom:
        return "^";
    }
  }
</script>

<div>
  {#each map as row}
    {#each row as tile}
      {visualize(tile)}
    {/each}
    <br />
  {/each}
</div>
