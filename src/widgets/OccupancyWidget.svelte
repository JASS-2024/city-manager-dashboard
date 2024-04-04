<script lang="ts">
    import Map from "./shared/Map.svelte";

    type Slots = {
        [key: number]: [number, number, boolean];
    };

    let slots: Slots = {
    1: [13, 16, true],
    2: [23, 16, false],
    3: [33, 16, true],
    4: [51, 16, true],
    5: [60, 15.5, false], //
    6: [60, 10.5, false],
    7: [51, 36, true],
    8: [51, 30, true],
    9: [60, 33.5, false],
    }

    let tileSize = 100;

    function updateTileSize(event: CustomEvent<number>) {
        console.log("Tile size updated")
        tileSize = event.detail;
        slots = { ...slots };
    }

</script>
<div class="widget">
    <Map on:send-data={updateTileSize}/>
    <svg>

    {#each Object.entries(slots) as [slotId, [x, y, condition]]}
    {#if [5, 6, 9].includes(+slotId)}
        <rect
            x={(x / 10) * tileSize} y={(y / 10) * tileSize} width={tileSize / 2.5} height={tileSize / 2.5}
            fill={condition ? "red" : "green"} opacity={0.6}
            transform="rotate(90, {(x / 10) * tileSize}, {(y / 10) * tileSize})"
        />
    {:else}
        <rect
            x={(x / 10) * tileSize} y={(y / 10) * tileSize} width={tileSize / 2.5} height={tileSize / 2.5}
            fill={condition ? "red" : "green"} opacity={0.6}
        />
{/if}
    {/each}
    </svg>
</div>

<style>
    @import './WidgetStyles.css';

   .widget {
    position: relative;
  }
  .widget svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>