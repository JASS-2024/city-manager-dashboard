<script lang="ts">
import mqtt from "mqtt";
import { onMount } from "svelte";

import { Tile, map} from "$lib/Utils"

import Map from "./shared/Map.svelte";

//let messages = [];
type Positions = {
    [key: string]: [number, number];
};



let tileSize = 0;

// Initialize the positions object with the defined type
let positions: Positions = {
};

function updateTileSize(event: CustomEvent<number>) {
    tileSize = event.detail;
    positions = { ...positions };
}

function mapPos(x: number, tile: number): number {
    console.log(`y:${x}`)
    return (x / 10) * tile
}

function mapPosX(x: number, tile: number): number {
    console.log(`x:${x}`)
    return (x / 10) * tile
}

onMount(() => {
    const URL = "ws://192.168.3.85:9001" // wss://test.mosquitto.org:8081
    const TOPIC = "vehicle/+/status"
    const client = mqtt.connect(URL);

    client.on("connect", () => {
        client.subscribe(TOPIC, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });

    client.on("message", (topic, message) => {
        console.log(`message: ${topic}`)
        const jsonObject = JSON.parse(message.toString());

        // Safely access the x and y values
        const x = jsonObject?.data?.coordinates?.x;
        const y = jsonObject?.data?.coordinates?.y;

        if (typeof x === "number" && typeof y === "number") {
            // Store the coordinates as an array [x, y] against the topic key
            positions = {...positions, topic: [x,y]}
            console.log(`x: ${x} y: ${y}`)
        } else {
            console.log(`Invalid coordinates received for topic ${topic}`);
        }
    });
})
</script>

<div class="widget">
    <Map on:send-data={updateTileSize} />
    <svg>
        {#each Object.entries(positions) as [topic, [x, y]]}
            <circle cx={mapPosX(x - 50, tileSize)} cy={mapPos(y-25, tileSize)} r="10" fill="red" />
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