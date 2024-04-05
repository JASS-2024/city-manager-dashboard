<script lang="ts">
  import { onMount } from "svelte";
  import Led from "./shared/Led.svelte";
  import BlackLed from "./shared/BlackLed.svelte"

    let ws: WebSocket;
    let colours: Uint8Array[] = [];

    // 
    onMount( () => {
        ws = new WebSocket ("ws://192.168.0.48/ws")
        ws.onopen = () => {
            ws.send("{'lv':true}");
        }
        
        ws.binaryType = "arraybuffer"
        
        ws.addEventListener("message", event => {
            if (event.data.toString() === "[object ArrayBuffer]") {
                let colourArr = new Uint8Array(event.data);
                console.log(colourArr)
                colours = []
                if (76 == colourArr[0])  {
                    for (let i = 2 * colourArr[1]; i < colourArr.length; i += 3) {
                        colours.push(colourArr.slice(i, i + 3))                        
                    }
                }
                // console.log(colours)
            }
        })
        return () => {ws.close()}
    })
</script>
<div id="container">
    {#each colours as colour, index}
        {#if colour[0] === 0 && colour[1] === 0 && colour[2] === 0}
            <BlackLed/>
        {:else}
            <Led --colour={`rgb(${colour[0]},${colour[1]},${colour[2]})`}></Led>
        {/if}
            <!-- <circle cx={index * 9} cy={50} r="4" fill={`rgb(${colour[0]},${colour[1]},${colour[2]})`} filter="url(#nnneon-filter)"/> -->
    {/each}

</div>

<style>
#container {
    /* background-color: gray; */
    width: 100000px;
    height: 100000px;
}
</style>