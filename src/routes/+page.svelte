<script lang="ts">
  import { onMount } from 'svelte';
  import AddWidget from "../widgets/AddWidget.svelte";
  import CalendarWidget from "../widgets/CalendarWidget.svelte";
  import DeleteWidget from '../widgets/DeleteWidget.svelte';
  import EditWidget from '../widgets/EditWidget.svelte';
  import OccupancyWidget from '../widgets/OccupancyWidget.svelte';
  import AuctionWidget from '../widgets/AuctionWidget.svelte';
  import TwinWidget from '../widgets/TwinWidget.svelte'
  import { getBookings } from '$lib/bookings';
  import { subscribe } from '$lib/mqtt';

  /*let widgets = [
    { id: 1, type: CalendarWidget },
    { id: 2, type: TwinWidget },
    { id: 3, type: OccupancyWidget },
    { id: 4, type: AuctionWidget },

  ];*/

  let widgetsShown = [3, 1, 2, 4]

  const widgetTypeMap = {
    1: [CalendarWidget, "Calendar"],
    2: [TwinWidget, "Digital Twin"],
    3: [OccupancyWidget, "Occupancy"],
    4: [AuctionWidget, "Auction"],
  };

  function removeWidget(index) {
    widgetsShown.splice(index, 1);
    widgetsShown = widgetsShown
  }

  function handleSelect(event) {
    const { widgetIndex, id } = event.detail;
    widgetsShown[widgetIndex] = id;
  }

  
  
  function handleAddWidget(event) {
    const { id } = event.detail;
    console.log(`adding ${id}`)
    widgetsShown = [...widgetsShown, id];
  }

  const handleAddRequest: OnMessageCallback = (topic, message) => {
    console.log("Received add request")
    if (widgetsShown.length < 4) {
        const jsonObject = JSON.parse(message.toString());

        // Safely access the x and y values
        let widget: number | 3 = 3; // Default to 3
        if (typeof jsonObject.widget === 'number') {
            widget = jsonObject.widget;
        }
        console.log(`adding ${widget}`)
        widgetsShown = [...widgetsShown, widget];
    }
    }
  
  onMount(async () => {
    getBookings()
    subscribe("dashboard/new_booking", getBookings)
    subscribe("dashboard/add", handleAddRequest)
  })

</script>


<div id="grid-container">
  {#each widgetsShown as id, index}
    <div class="widget-wrapper">
      <div class="top-controls">
        <div class="header">{widgetTypeMap[id][1]}</div>
        <div class="controls">
          <DeleteWidget on:click={() => removeWidget(index)}/>
          <EditWidget widgetIndex={index} widgets={widgetTypeMap} on:select={handleSelect}/>
        </div>
      </div>
      <svelte:component this={widgetTypeMap[id][0]}/>
    </div>
  {/each}
  {#if widgetsShown.length < 4}
    <AddWidget widgets={widgetTypeMap} on:addNewWidget={handleAddWidget} />
  {/if}
</div>


<style>
  #grid-container {
    display: grid;
    grid-template-columns: repeat(2, calc(50vw - 20px));
    grid-template-rows: repeat(2, calc(50vh - 20px));
    grid-gap: 10px;
    padding: 10px;
  }

  @media only screen and (max-width: 768px) {
    #grid-container {
      grid-template-columns: 100%;    
    }
  }

  .header {
    display: flex;
    font-weight: bold;
    padding: 10px 10px 10px 35px;
  }

  .top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 5px; 
  left: 5px; /* Adjust as needed */
  right: 5px; /* Adjust as needed */
}

  .widget-wrapper {
    position: relative;
    background-color: white;
    border-radius: 25px;
    padding: 40px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .controls {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    flex-direction: row;
  }

  :global(body){
    background: #edf3ff;
  }
</style>
