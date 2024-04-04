import mqtt, { type OnMessageCallback } from "mqtt";
import match from "mqtt-match";

const URL = "ws://192.168.3.85:9001"
const clientPromise = mqtt.connectAsync(URL).then((client) => {
    client.on("message", (topic, message, packet) => {
        for (let handler of handlers) {
            if (match(handler[0], topic)) {
                handler[1](topic, message, packet)
            }
        }
    })
    return client   
});

let handlers: [string, OnMessageCallback][] = []

export async function subscribe(topic: string, lambda: OnMessageCallback) {
    const client = await clientPromise
    client.subscribe(topic, (err) => {if (err) console.log(err)});
    handlers.push([topic, lambda])
}
