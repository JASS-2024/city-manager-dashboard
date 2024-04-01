<script>
  import TestWidget from "../widgets/TestWidget.svelte";

</script>

<div id="grid-container">
  <TestWidget />
  <TestWidget />
  <TestWidget />
  <TestWidget />
</div>

<style>
  #grid-container {
    display: grid;
    grid-template-columns: auto auto;
    height: 100%;
    width: 100%;
  }
</style>