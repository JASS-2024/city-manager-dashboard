<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    // const sampleDatae = 
    
    const data = {
        bookings: [{
            "garage": "Athena Garage",
            "time_period": {
                "start_time": 1712064387,
                "end_time": 1712071587
            },
            "licence_plate": "ABC123",
            "parking_space": 1,
            "price": 100
        },
        {
            "garage": "Leda Garage",
            "time_period": {
                "start_time": 1711974387,
                "end_time": 1711985187
            },
            "licence_plate": "ABC123",
            "parking_space": 1,
            "price": 100
        },
        {
            "garage": "Athena Garage",
            "time_period": {
                "start_time": 1712147187,
                "end_time": 1712150787
            },
            "licence_plate": "ABC123",
            "parking_space": 1,
            "price": 100
        }]
    }

    const garageToColours: Map<String, string> = new Map([
        ["Athena Garage", "red"],
        ["Leda Garage", "blue"]
    ])

    const events = data.bookings.map((booking, i) => ({
        id: i,
        start: new Date(booking["time_period"]["start_time"] * 1000),
        end: new Date(booking["time_period"]["end_time"] * 1000),
        title: booking["licence_plate"] + "\n" + `(${booking["garage"]})`,
        backgroundColor: garageToColours.get(booking["garage"])
    }));
    
    let plugins = [ TimeGrid ];
    let options = {
        height: "100%",
        view: 'timeGridDay',
        headerToolbar: {start: 'title', center: "", end: 'timeGridWeek,timeGridDay today prev,next'},
        events: events,
    };
</script>

<div class="widget">
    <Calendar {plugins} {options}/>
</div>

<style>
    @import './WidgetStyles.css';
</style>