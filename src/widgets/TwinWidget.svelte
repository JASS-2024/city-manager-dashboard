<script>
import Map from "./shared/Map.svelte";
</script>
<div id="twinWidget">
    <div class="spacer"></div>
    <Map/>
    <div class="spacer"></div>
</div>

<style>
    #twinWidget {
        width: 100%;
        height: 100%;
        background-color: var(--color);
        text-align: center;
        display: flex;
        flex-direction: column;
    }
</style>