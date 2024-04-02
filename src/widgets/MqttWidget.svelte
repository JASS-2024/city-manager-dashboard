<script>
import mqtt from "mqtt";
import { onMount } from "svelte";

let messages = [];

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
        messages = [...messages, message]
    });
})
</script>

<div class="widget">
{#each messages as msg}
    <p>{msg}</p>
{/each}
</div>

<style>
    @import './WidgetStyles.css';
</style>