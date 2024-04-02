<script>
    import Calendar from '@event-calendar/core';
    // import DayGrid from '@event-calendar/day-grid';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [ TimeGrid ];
    let options = {
        height: "100%",
        view: 'timeGridDay',
        headerToolbar: {start: 'title', center: "", end: 'timeGridWeek,timeGridDay today prev,next'},
        events: [
            {id: "Event 1", start: new Date("2024-04-01T18:00:00.000"), end: new Date("2024-04-01T19:00:00.000")},
            {id: "Event 2", start: new Date("2024-04-02T18:00:00.000"), end: new Date("2024-04-02T19:00:00.000")},
            {id: "Event 3", start: new Date("2024-04-03T18:00:00.000"), end: new Date("2024-04-03T19:00:00.000")},
            {id: "Event 4", start: new Date("2024-04-04T18:00:00.000"), end: new Date("2024-04-04T19:00:00.000")},
        ],
        eventContent: () => "small"
    };
</script>

<div class="widget">
    <Calendar {plugins} {options}/>
</div>

<style>
    @import './WidgetStyles.css';
</style>