<script>
    import { onMount } from 'svelte';
    let {
        text = 'CODE',
        fontSize = '5em',
        // fontFamily = 'Montserrat',
        minHeight = '300px',
        strokeWidth = 4,
        colors = ['#4D163D', '#840037', '#BD0034', '#BD0034', '#FDB731'],
        className = 'loading-text',
    } = $props();
</script>

<div class="container" style="height:{minHeight}; min-height: {minHeight};">
    <svg viewBox="0 0 400 400">
        <defs>
            <symbol id="s-text" >
                <text text-anchor="middle" x="50%" y="60%" style="font-size: {fontSize};">{text}</text>
            </symbol>
        </defs>

        <use xlink:href="#s-text" class="text" style="stroke-width: {strokeWidth};"></use>
        <use xlink:href="#s-text" class="text" style="stroke-width: {strokeWidth};"></use>
        <use xlink:href="#s-text" class="text" style="stroke-width: {strokeWidth};"></use>
        <use xlink:href="#s-text" class="text" style="stroke-width: {strokeWidth};"></use>
        <use xlink:href="#s-text" class="text" style="stroke-width: {strokeWidth};"></use>
    </svg>
</div>

<style>
    /* @import url(https://fonts.googleapis.com/css?family=Montserrat); */

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    svg {
        display: block;
        /* font: 'Montserrat'; */
        width: 100%;
        margin: 0 auto;
    }

    .text {
        fill: none;
        stroke-linejoin: round;
        stroke-dasharray: 70 330;
        stroke-dashoffset: 0;
        -webkit-animation: stroke 6s infinite linear;
        animation: stroke 6s infinite linear;
    }

    .text:nth-child(5n + 1) {
        stroke: #4D163D;
        animation-delay: -1.2s;
    }
    .text:nth-child(5n + 2) {
        stroke: #840037;
        animation-delay: -2.4s;
    }
    .text:nth-child(5n + 3) {
        stroke: #BD0034;
        animation-delay: -3.6s;
    }
    .text:nth-child(5n + 4) {
        stroke: #BD0034;
        animation-delay: -4.8s;
    }
    .text:nth-child(5n + 5) {
        stroke: #FDB731;
        animation-delay: -6s;
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: -400;
        }
    }
</style> 