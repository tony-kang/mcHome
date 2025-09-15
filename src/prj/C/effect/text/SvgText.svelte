<script>
    export let text = '';
    export let fontSize = '150px';
    export let fontFamily = 'Lora';
    export let fontWeight = '700';
    export let letterSpacing = '10px';
    export let strokeColor = '#ffa5d8';
    export let strokeWidth = '3';
    export let fillColor = '#4f46e5';
    export let fillOpacity = '1';
    export let minHeight = '100vh';
    export let className = '';
</script>

<div class="svg-container {className}" style="min-height: {minHeight};">
    <svg width="100%" height="100%">
        <text 
            x="50%" 
            y="60%" 
            text-anchor="middle"
            style="font-family: {fontFamily}; letter-spacing: {letterSpacing}; stroke: {strokeColor}; font-size: {fontSize}; font-weight: {fontWeight}; stroke-width: {strokeWidth}; fill: {fillColor}; fill-opacity: {fillOpacity};"
        >
            {text}
        </text>
    </svg>
</div>

<style>
    .svg-container {
        margin: 0;
    }

    svg text {
        animation: textAnimate 5s infinite alternate;
    }

    @keyframes textAnimate {
        0% {
            stroke-dasharray: 0 50%;
            stroke-dashoffset: 20%;
            fill-opacity: 1;
        }
        100% {
            stroke-dasharray: 50% 0;
            stroke-dashoffset: -20%;
            fill-opacity: 0;
        }
    }
</style> 