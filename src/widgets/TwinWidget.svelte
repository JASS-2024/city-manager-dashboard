<script lang="ts">
    import { onMount } from "svelte";
    
    import Map from "./shared/Map.svelte";
    import { subscribe } from "$lib/mqtt";
    import type { OnMessageCallback } from "mqtt";

    type Point = {
        x: number,
        y: number
    }

    type LineSegment = {
        start: Point,
        end: Point,
        background: string,
        class: string,
        flip: boolean
    }

    type LEDStrip = {
        segs: LineSegment[],
    }

    let ledStrips: {[key:string]: LEDStrip} = {
        "WLEDTranslator/48": {
            segs: [{start: {x: 6, y: 3}, end: {x: 6, y: 4}, background: "", flip: false},
                   {start: {x: 6, y: 4}, end: {x: 5, y: 4}, background: "", flip: false},
                   {start: {x: 5, y: 4}, end: {x: 5, y: 3}, background: "", flip: true},
                   {start: {x: 5, y: 3}, end: {x: 6, y: 3}, background: "", flip: true}],
        },
        "WLEDTranslator/33": {
            segs: [
                {start: {x: 4, y: 2}, end: {x: 3, y : 2}, background: "", flip: false},
                {start: {x: 3, y: 2}, end: {x: 2, y : 2}, background: "", flip: false},
                {start: {x: 2, y: 2}, end: {x: 1, y : 2}, background: "", flip: false},

                {start: {x: 1, y: 2}, end: {x: 1, y : 1}, background: "", flip: true},
                
                {start: {x: 1, y: 1}, end: {x: 2, y : 1}, background: "", flip: true},
                {start: {x: 2, y: 1}, end: {x: 3, y : 1}, background: "", flip: true},
                {start: {x: 3, y: 1}, end: {x: 4, y : 1}, background: "", flip: true},
                {start: {x: 4, y: 1}, end: {x: 5, y : 1}, background: "", flip: true},
                {start: {x: 5, y: 1}, end: {x: 6, y : 1}, background: "", flip: true},
        
                {start: {x: 6, y: 1}, end: {x: 6, y : 2}, background: "", flip: false},
                {start: {x: 6, y: 2}, end: {x: 5, y : 2}, background: "", flip: false},
                {start: {x: 5, y: 2}, end: {x: 4, y : 2}, background: "", flip: false},
            ],
            }  
    }


    
    const update_leds = (colourArr: Uint8Array, source: keyof typeof ledStrips) => {
        if (76 == colourArr[0])  {
            const LEDS_PER_SEG = 37
            let segmentId = 0

            for (let i = 2 * colourArr[1]; i < colourArr.length; i += 3) {
                if (segmentId >= ledStrips[source].segs.length) {
                    console.log("WARNING SKIPPING")
                    continue
                }

                const seg = ledStrips[source].segs[segmentId] 
                const start = ledStrips[source].segs[segmentId].start
                const end = ledStrips[source].segs[segmentId].end
                let rotation;

                if (end.x - start.x == 0) { // Vertical
                    if (seg.end.y < seg.start.y || seg.end.x < seg.start.x) {
                        rotation = 0
                    }  else {
                        rotation = 180
                    }
                    seg.class = "led-vertical"
                } else {
                    seg.class = "led-horizontal"
                    if (seg.end.y < seg.start.y || seg.end.x < seg.start.x) {
                        rotation = 270
                    }  else {
                        rotation = 90
                    }
                }

                console.log(`Segment ID: ${segmentId}`)

                let background = `background: linear-gradient(${rotation}deg,`
                for (let leds = 0; leds < LEDS_PER_SEG && i < colourArr.length; i += 3, leds++) {
                    if (`${colourArr[i]},${colourArr[i + 1]},${colourArr[i + 2]}`== "0,0,0") {
                        colourArr[i] = 255
                        colourArr[i+1] = 255
                        colourArr[i+2] = 255
                    }
                    background += `rgb(${colourArr[i]}, ${colourArr[i + 1]}, ${colourArr[i + 2]}),`
                }
                background = background.slice(0, background.length - 1);
                background += ")"
                
                let newSegs = ledStrips[source].segs;
                newSegs[segmentId] = {...ledStrips[source].segs[segmentId], background: background}

                ledStrips = {...ledStrips, [source]: {...ledStrips[source], segs: newSegs}}
                segmentId++;
            }
            console.log(ledStrips)
        }
    }

    onMount( () => {
        for (let strip of Object.keys(ledStrips)) {
            subscribe(strip, (topic, msg) => {update_leds(msg, topic)})
        }
    })

    type Positions = {
        [key: string]: [number, number];
    };

    let animating = false
    
    let tileSize = 10;

    let currentRobotImage = "./assets/idleRobot.png"
    
    // Initialize the positions object with the defined type
    let positions: Positions = {
    };
    
    function updateTileSize(event: CustomEvent<number>) {
        tileSize = event.detail;
        Object.keys(ledStrips).forEach( (key) => {
            console.log("dONE")
            console.log(ledStrips[key])
        })
        positions = { ...positions };
    }
    
    function mapPos(x: number, tile: number): number {
        return (x / 10) * tile
    }
    
    function mapPosX(x: number, tile: number): number {
        return (x / 10) * tile
    }

    function setRobotImage(state: number) {
                switch(state) {
                    case 3: {
                        currentRobotImage = "./assets/at3.png";
                        break;
                    }
                    case 4: {
                        currentRobotImage = "./assets/at4.png";
                        break;
                    }
                    case 0: {
                        currentRobotImage = "./assets/atCharge.png";
                        break;
                    }
                    default: {
                        currentRobotImage = "./assets/idleRobot.png";
                        break;
                    }

                }
    }
    
    async function robotMovement(origin: number, target: number) {
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        do {
            setRobotImage(origin);
            await sleep(2000);
            setRobotImage(target);
            await sleep(2000);
        } while(animating)
    }

    const updateRobotArm: OnMessageCallback = (topic, message) => {
        console.log("received request to move arm")

        const jsonObject = JSON.parse(message.toString());

        // Safely access the x and y values
        const status = jsonObject?.status;
        const origin = jsonObject?.origin;
        const target = jsonObject?.target;

        if (status === "moving") {
            if (typeof origin === "number" && typeof target === "number") {
                console.log(`moving robot arm from ${origin} to ${target}`)
                animating = true
                robotMovement(origin, target);
            }
        } else if(status === "success") {
            animating = false
            setRobotImage(1);
         } else {
            console.log(`Invalid coordinates received for topic ${topic}`);
        }
        

        
    }

    const updateDuckiePosition: OnMessageCallback = (topic, message) => {
        const jsonObject = JSON.parse(message.toString());

        // Safely access the x and y values
        const x = jsonObject?.data?.coordinates?.x;
        const y = jsonObject?.data?.coordinates?.y;

        if (typeof x === "number" && typeof y === "number") {
            // Store the coordinates as an array [x, y] against the topic key
            positions = {...positions, [topic]: [x,y]}
        } else {
            console.log(`Invalid coordinates received for topic ${topic}`);
        }
    }

    onMount(() => {
        subscribe("vehicle/+/status", updateDuckiePosition)
        subscribe("camera/+/status", updateDuckiePosition)
        subscribe("robot-arm", updateRobotArm)
    })

    function estimateBackgroundSize(text, fontSize) {
        const widthPerCharacter = fontSize * 0.5;
        const width = text.length * widthPerCharacter + 8;
        const height = fontSize * 1.5;
        return { width, height };
    }
    </script>

<div class="widget">
    <Map on:send-data={updateTileSize} />

        <svg style="z-index: 10000;">
            <image href={currentRobotImage} x={mapPosX(35, tileSize)} y={mapPos(2, tileSize)} width={tileSize * 2} height={tileSize * 2} /> 
            {#each Object.entries(positions) as [topic, [x, y]]}
            {#if !topic.includes("camera")}
            <image href="./assets/duck.png" x={mapPosX(x, tileSize) - tileSize/2} y={mapPos(y, tileSize) - tileSize/2} width={tileSize / 2} height={tileSize / 2} /> 
            {:else}       
            <image href="./assets/duck_camera.png" x={mapPosX(x, tileSize) - tileSize/2} y={mapPos(y, tileSize) - tileSize/2} width={tileSize / 2} height={tileSize / 2} /> 
            {/if}
            {@const { width, height } = estimateBackgroundSize(topic.split("/")[1], 13)}
            <rect x={mapPosX(x, tileSize) - width / 2} y={mapPos(y + 2, tileSize) - height / 2} width={width} height={height} fill="white" rx="5"/>
            <text class="caption" x={mapPosX(x, tileSize)} y={mapPos(y + 2, tileSize)} font-size="13" text-anchor="middle" dominant-baseline="central">
                   {topic.split("/")[1]}
                </text>
            {/each}
    </svg>


    <div id="led_container">
        {#each Object.keys(ledStrips) as stripSource}
            <!-- <p>{console.log(ledStrips[stripSource])}</p> -->
            {#each ledStrips[stripSource].segs as seg}
                {#if seg.end.y < seg.start.y || seg.end.x < seg.start.x} 
                    <div class="leds {seg.class}" style="{seg.background}; --delta: {(seg.flip) ? tileSize * 0.12 : 0}px; --tileSize: {tileSize}; --y: {seg.end.y * tileSize}px; --x: {seg.end.x * tileSize}px"></div>
                {:else}
                    <div class="leds {seg.class}" style="{seg.background}; --delta: {(seg.flip) ? tileSize * 0.12 : 0}px; --tileSize: {tileSize}; --y: {seg.start.y * tileSize}px; --x: {seg.start.x * tileSize}px"></div>
                {/if}
            
            {/each}
        {/each}
    </div>
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

    #led_container {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .leds {
        position: absolute;
        top: var(--y);
        left: var(--x);
    }

    .led-vertical {
        width: calc(var(--tileSize) * 0.12px);
        height: calc(var(--tileSize) * 1px);
        left: calc(var(--x) - var(--delta));
    }

    .led-horizontal {
        height: calc(var(--tileSize) * 0.12px);
        width: calc(var(--tileSize) * 1px);
        top: calc(var(--y) - var(--delta));
    }
</style>