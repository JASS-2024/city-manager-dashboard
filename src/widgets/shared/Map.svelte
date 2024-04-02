<script lang="ts"> 
enum Tile {
  RoadVertical,
  RoadHorizontal,
  Blank
}
let map = [[Tile.RoadHorizontal, Tile.RoadHorizontal]]

function visualize(tile: Tile) {
  switch tile {
    case Tile.RoadVertical: "="
    case Tile.RoadHorizontal: "|"
    case Tile.Blank: " "
  }
}
</script>

<div>
  {#each map as row}
    {#each row as tile}
      {
        visualize(tile)
      }  
    {/each}
  "\n"
  {/each}
</div>