<script>
  import { onMount } from 'svelte';
  import AddWidget from "../widgets/AddWidget.svelte";
  import CalendarWidget from "../widgets/CalendarWidget.svelte";
  import TwinWidget from "../widgets/TwinWidget.svelte";
  import DeleteWidget from '../widgets/DeleteWidget.svelte';
  import EditWidget from '../widgets/EditWidget.svelte';
  import OccupancyWidget from '../widgets/OccupancyWidget.svelte';
  import AuctionWidget from '../widgets/AuctionWidget.svelte';
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
<<<<<<< HEAD
    1: [CalendarWidget, "Calendar Widget"],
    2: [TwinWidget, "Twin Widget"],
    3: [OccupancyWidget, "Occupancy Widget"],
    4: [AuctionWidget, "Auction Widget"],
=======
    "Calendar": CalendarWidget,
    "Digital Twin": TwinWidget,
    "Occupancy": OccupancyWidget,
    "Auction": AuctionWidget
>>>>>>> 33145d33a2592dc6d3f81392a14d75d50df0f4f8
  };

  function removeWidget(index) {
    widgetsShown.splice(index, 1);
    widgetsShown = widgetsShown
  }

  function handleSelect(event) {
    const { widgetIndex, id } = event.detail;
    widgetsShown[widgetIndex] = id;
  }

  
<<<<<<< HEAD
  // Temporarily HERE
  onMount(getBookings)
=======
  let nextWidgetId = Math.max(...widgetsShown.map(w => w.id)) + 1;
>>>>>>> 33145d33a2592dc6d3f81392a14d75d50df0f4f8
  
  function handleAddWidget(event) {
    const { id } = event.detail;
    console.log(`adding ${id}`)
    widgetsShown = [...widgetsShown, id];
  }
<<<<<<< HEAD
=======
  
  onMount(async () => {
    getBookings()
    subscribe("dashboard/new_booking", getBookings)
  })
>>>>>>> 33145d33a2592dc6d3f81392a14d75d50df0f4f8

</script>


<div id="grid-container">
  {#each widgetsShown as id, index}
    <div class="widget-wrapper">
      <svelte:component this={widgetTypeMap[id][0]}/>
      <div class="controls">
        <DeleteWidget on:click={() => removeWidget(index)}/>
        <EditWidget widgetIndex={index} widgets={widgetTypeMap} on:select={handleSelect}/>
      </div>
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
