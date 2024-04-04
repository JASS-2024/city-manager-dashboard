
<div class="circle-container">
    <div class="circle"></div>
</div>

<style>
.circle-container {
    width: 10px;
    height: 10px;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    display: inline-block;
}

.circle {
    width: 1px;
    height: 1px;
    display: inline-block;
    margin: 8px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 2px 1px white,
                0 0 3px 1.5px white,
                0 0 4px 2px white,
                0 0 5px 2px oklch(from var(--colour) calc(l * 1.4) 0.6 h),
                0 0 6px 2px oklch(from var(--colour) calc(l * 1.2) 0.6 h), 
                0 0 8px 4px oklch(from var(--colour) calc(l * 1.3) 0.6 h);
    /* box-shadow: 0 0 3px 2px var(--colour), 0 0 4px 2px rgb(234, 198, 255), 0 0 6px 4px rgb(211, 203, 215); */
}
</style>
