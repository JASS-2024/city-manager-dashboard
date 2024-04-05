<script lang="ts">
    import { onMount } from "svelte";
    
    import Map from "./shared/Map.svelte";
  import { subscribe } from "$lib/mqtt";
  import type { OnMessageCallback } from "mqtt";
    
    type Positions = {
        [key: string]: [number, number];
    };
    
    let tileSize = 10;
    
    // Initialize the positions object with the defined type
    let positions: Positions = {
    };
    
    function updateTileSize(event: CustomEvent<number>) {
        tileSize = event.detail;
        positions = { ...positions };
    }
    
    function mapPos(x: number, tile: number): number {
        //console.log(`y:${x}`)
        return (x / 10) * tile
    }
    
    function mapPosX(x: number, tile: number): number {
        //console.log(`x:${x}`)
        return (x / 10) * tile
    }
    
    const updateDuckiePosition: OnMessageCallback = (topic, message) => {
        const jsonObject = JSON.parse(message.toString());

        // Safely access the x and y values
        const x = jsonObject?.data?.coordinates?.x;
        const y = jsonObject?.data?.coordinates?.y;

        if (typeof x === "number" && typeof y === "number") {
            // Store the coordinates as an array [x, y] against the topic key
            positions = {...positions, [topic]: [x,y]}
            console.log(`x: ${x} y: ${y}`)
        } else {
            console.log(`Invalid coordinates received for topic ${topic}`);
        }
    }

    onMount(() => {
        subscribe("vehicle/+/status", updateDuckiePosition)
        subscribe("camera/+/status", updateDuckiePosition)
    })

    function estimateBackgroundSize(text, fontSize) {
    const widthPerCharacter = fontSize * 0.5;
    const width = text.length * widthPerCharacter + 2;
    const height = fontSize * 1.5;
    return { width, height };
  }
    </script>
    
    <div class="widget">
        <Map on:send-data={updateTileSize} />
        <svg>
            {#each Object.entries(positions) as [topic, [x, y]]}
            {#if !topic.includes("camera")}
            <image href="./assets/duck.png" x={mapPosX(x, tileSize) - tileSize/2} y={mapPos(y, tileSize) - tileSize/2} width={tileSize / 2} height={tileSize / 2} /> 
            {:else}       
            <image href="./assets/duck_camera.png" x={mapPosX(x, tileSize) - tileSize/2} y={mapPos(y, tileSize) - tileSize/2} width={tileSize / 2} height={tileSize / 2} /> 
            {/if}
            {@const { width, height } = estimateBackgroundSize(topic, 13)}
            <rect x={mapPosX(x, tileSize) - width / 2} y={mapPos(y + 2, tileSize) - height / 2} width={width} height={height} fill="white" rx="5"/>
            <text class="caption" x={mapPosX(x, tileSize)} y={mapPos(y + 2, tileSize)} font-size="13" text-anchor="middle" dominant-baseline="central">
                   {topic}
                </text>
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