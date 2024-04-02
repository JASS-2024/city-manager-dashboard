<script lang="ts">
    enum TypeOne {
        Hop
    }
</script>

<div id="testWidget">
    <div class="spacer"></div>
    <p id="duck">🦆</p>
    <div class="spacer"></div>
</div>

<style>
    #testWidget {
        width: 100%;
        height: 100%;
        background-color: var(--color);
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    #duck {
        font-size: 30pt;
        margin: 0;
    }
</style>