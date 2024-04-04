<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import { bookings } from '$lib/bookings';
    import type { Booking } from '$lib/bookings';

    type Event = {
        id: number
        start: typeof Date
        end: typeof Date
        title: string,
        backgroundColor: string | undefined
    }

    let events: Event[] = []
    let options;
    const garageToColours: Map<String, string> = new Map([
        ["Athena Garage", "red"],
        ["Leda Garage", "blue"]
    ])

    bookings.subscribe((bookings) => {
        events = bookings.map((booking: Booking, i: number) => ({
            id: i,
            start: booking["time_period"]["start_time"],
            end: booking["time_period"]["end_time"],
            title: booking["licence_plate"] + "\n" + `(${booking["garage"]})`,
            backgroundColor: garageToColours.get(booking["garage"])
        }))
    })


    
    let plugins = [ TimeGrid ];
    $: options = {
        height: "100%",
        view: 'timeGridDay',
        headerToolbar: {start: 'title', center: "", end: 'timeGridWeek,timeGridDay today prev,next'},
        events: events,
    }

</script>

<div class="widget">
    <Calendar {plugins} {options}/>
</div>

<style>
    @import './WidgetStyles.css';
</style>