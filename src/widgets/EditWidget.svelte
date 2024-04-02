<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let widgetId;

  let show = false;
  let container;
  let widgetNames = ["Calendar", "Digital Twin", "Occupancy"];

  function onWindowClick(e) {
    if (!container.contains(e.target))
      show = false;
  }

  function selectWidget(widgetName) {
    dispatch('select', { widgetName, widgetId });
    show = false;
  }
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
  <button class="control-btn" on:click={() => show = !show }>✏️</button>
  {#if show}
    <div class="options" style="position:absolute; top:100%; right:0;">
      {#each widgetNames as widgetName}
        <a on:click={() => selectWidget(widgetName)}>{widgetName}</a>
        <hr class="solid" color="gray">
      {/each}
    </div>
  {/if}
</div>


<style>
  .options {
    border: 1px solid #ccc;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }

	a {
		display: block;
	}
  .control-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin: 2px;
  }
</style>
