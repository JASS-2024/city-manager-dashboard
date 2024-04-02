<script lang="ts">
import mqtt from "mqtt";
import { onMount } from "svelte";

//let messages = [];

let positions = {}

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
       /* const jsonObject = JSON.parse(message);
        const x = jsonObject.data.coordinates.x;
        const y = jsonObject.data.coordinates.y;
        positions[topic] = (x, y)
        //messages = [...messages, message]*/
    });
})
</script>

<div class="widget">

</div>

<style>
    @import './WidgetStyles.css';
</style>