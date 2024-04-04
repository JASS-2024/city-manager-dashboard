<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let showDropdown = false;
    let container;
    let widgetOptions = ["Calendar", "Digital Twin", "Occupancy", "Auction"];
    
    function addNewWidget(widgetType) {
      dispatch('addNewWidget', { widgetType });
      showDropdown = false;
    }

    function onWindowClick(e) {
    if (!container.contains(e.target))
        showDropdown = false;
  }
  </script>

  <svelte:window on:click={onWindowClick} />
  
  <div class="widget">
    <button bind:this={container} on:click={() => showDropdown = !showDropdown}>+</button>
    
    {#if showDropdown}
        <div class="dropdown">
        {#each widgetOptions as option}
            <div on:click={() => addNewWidget(option)}>{option}</div>
        {/each}
        </div>
    {/if}
</div>
  
  <style>
     .widget {
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: dashed;
    border-radius: 25px;
    border-color: gray;
    position: relative; /* Add this to position the dropdown relative to the widget */
}

.dropdown {
    position: absolute;
    top: 56%; /* Aligns the top of the dropdown with the bottom of the button */
    left: 50%; /* Centers the dropdown horizontally relative to the widget container */
    transform: translateX(-50%); /* Ensures the dropdown is centered under the button */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    z-index: 1;
    width: auto; /* Adjusts the width of the dropdown based on its content */
}

.dropdown div {
    padding: 10px;
    cursor: pointer;
}

.dropdown div:hover {
    background-color: #f0f0f0;
}

button {
    color: gray;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 500%; /* Adjusted font size */
    margin: 0; /* Adjusted margin to help with alignment */
    padding: 0; /* Ensures the button has no extra space around it */
}
  </style>
  