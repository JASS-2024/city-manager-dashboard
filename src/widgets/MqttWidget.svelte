<script>
import mqtt from "mqtt";
import { onMount } from "svelte";

let messages = [];

onMount(() => {
    const URL = "wss://test.mosquitto.org:8081"
    const TOPIC = "floor1/room1"
    const client = mqtt.connect(URL);

    client.on("connect", () => {
        client.subscribe(TOPIC, (err) => {
            if (!err) {
                client.publish(TOPIC, "Hello mqtt friends");
            } else {
                console.log(err)
            }
        });
    });

    client.on("message", (topic, message) => {
        messages = [...messages, message]
    });
})
</script>

<div>
{#each messages as msg}
    <p>{msg}</p>
{/each}
</div>
