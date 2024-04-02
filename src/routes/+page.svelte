<script>
  import CalendarWidget from "../widgets/CalendarWidget.svelte";
  import MqttWidget from "../widgets/MqttWidget.svelte";
  import TestWidget from "../widgets/TestWidget.svelte";
    import TwinWidget from "../widgets/TwinWidget.svelte";
</script>

<div id="grid-container">
  <CalendarWidget />
  <TwinWidget/>
  <MqttWidget />
  <TestWidget --color="green"/>
</div>

<style>
  #grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    height: 100%;
    width: 100%;
  }
</style>