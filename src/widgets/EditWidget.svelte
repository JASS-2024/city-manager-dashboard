<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let widgetIndex;
  export let widgets;

  export let icon = "✏️"
  let show = false;
  let container;
  function onWindowClick(e) {
    if (!container.contains(e.target))
      show = false;
  }

  function selectWidget(id) {
    dispatch('select', { widgetIndex, id });
    show = false;
  }
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
  <button class="control-btn" on:click={() => show = !show }>{icon}</button>
  {#if show}
    <div class="options" style="position:absolute; top:100%; right:0;">
    {#each Object.entries(widgets) as [id, [Widget, label]]}
      <a on:click={() => selectWidget(id)}>{label}</a>
      {/each}
    </div>
  {/if}
</div>


<style>
  .options {
  position: absolute;
  top: 100%; /* Aligns the top of the dropdown with the bottom of the button */
  left: 50%; /* Centers the dropdown horizontally relative to the container */
  transform: translateX(-50%); /* Ensures the dropdown is centered under the button */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); /* Optional: Adds a shadow for depth */
  z-index: 1;
  width: auto; /* Adjusts the width of the dropdown based on its content */
  min-width: 120px; /* Ensures a minimum width for the dropdown */
}

.options a {
  display: block;
  padding: 10px;
  cursor: pointer;
  color: black; /* Ensures text color is set for clarity */
  text-decoration: none; /* Removes underline from links */
}

.options a:hover {
  background-color: #f0f0f0; /* Adds a hover effect similar to the AddWidget */
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
