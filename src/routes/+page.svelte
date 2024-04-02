<script>
  import { onMount } from 'svelte';
  import AddWidget from "../widgets/AddWidget.svelte";
  import CalendarWidget from "../widgets/CalendarWidget.svelte";
  import MqttWidget from "../widgets/MqttWidget.svelte";
  import TestWidget from "../widgets/TestWidget.svelte";
  import TwinWidget from "../widgets/TwinWidget.svelte";
  import DeleteWidget from '../widgets/DeleteWidget.svelte';
  import EditWidget from '../widgets/EditWidget.svelte';

  let widgets = [
    { id: 1, type: CalendarWidget },
    { id: 2, type: TwinWidget },
    { id: 3, type: MqttWidget }
  ];

  let widgetsShown = [
    { id: 1, type: CalendarWidget },
    { id: 2, type: TwinWidget },
  ];

  const widgetTypeMap = {
    "Calendar": CalendarWidget,
    "Digital Twin": TwinWidget,
    "Occupancy": MqttWidget,
    // Add other mappings as necessary...
  };

  function removeWidget(id) {
    console.log(`Remove ${id}`)
    widgetsShown = widgetsShown.filter(widget => widget.id !== id);
  }

  function handleSelect(event) {
    const { widgetName, widgetId } = event.detail;
    const newWidgetType = widgetTypeMap[widgetName];

    widgetsShown = widgetsShown.map(widget => 
      widget.id === widgetId ? { ...widget, type: newWidgetType } : widget
    );
  }

</script>

<div id="grid-container">
  {#each widgetsShown as {id, type}, index (id)}
    <div class="widget-wrapper">
      <svelte:component this={type}/>
      <div class="controls">
        <DeleteWidget on:click={() => removeWidget(id)}/>
        <EditWidget widgetId={id} on:select={handleSelect}/>
      </div>
    </div>
  {/each}
</div>

<style>
  #grid-container {
    display: grid;
    grid-template-columns: repeat(2, calc(50vw - 20px));
    grid-template-rows: repeat(2, calc(50vh - 20px));
    grid-gap: 10px;
    padding: 10px;
  }
  .widget-wrapper {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding: 40px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .controls {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    flex-direction: row;
  }
</style>
