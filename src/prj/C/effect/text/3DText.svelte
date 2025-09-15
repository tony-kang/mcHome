<script>
    export let text = '';
    export let fontSize = 'calc(2rem + 2vw)';
    export let fontFamily = 'bungee, sans-serif';
    export let fontWeight = '400';
    export let letterSpacing = '0.4rem';
    export let className = '';
    export let outlineColor = '#000000';
    export let outlineWidth = '1px';
    // export let colors = {
    //     primary: '#f6aca2',
    //     secondary: '#f49b90',
    //     tertiary: '#f28b7d',
    //     quaternary: '#f07a6a',
    //     quinary: '#ee6352'
    // };
    export let minHeight = '200px';
</script>

<div class="content {className}" style="min-height: {minHeight};">
    <h1 class="text_shadows" style="font-size: {fontSize}; font-family: {fontFamily}; font-weight: {fontWeight}; letter-spacing: {letterSpacing}; --outline-color: {outlineColor}; --outline-width: {outlineWidth};">
        {text}
    </h1>
</div>

<style>
    :root {
        --3d-color-primary: #f6aca2;
        --3d-color-secondary: #f49b90;
        --3d-color-tertiary: #f28b7d;
        --3d-color-quaternary: #f07a6a;
        --3d-color-quinary: #ee6352;
    }
    
    .content {
        display: flex;
        align-content: center;
        justify-content: center;
    }

    .text_shadows {
        text-shadow: 
            var(--outline-width) var(--outline-width) 0 var(--outline-color),
            calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
            var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
            calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
            3px 3px 2px rgba(244, 155, 144, 0.5),
            6px 6px 4px rgba(242, 139, 125, 0.4),
            9px 9px 6px rgba(240, 122, 106, 0.3),
            12px 12px 8px rgba(238, 99, 82, 0.2);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        color: var(--3d-color-primary);
        animation: shadows 1.2s ease-in infinite, move 1.2s ease-in infinite;
    }

    @keyframes shadows {
        0% {
            text-shadow: none;
        }
        10% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5);
        }
        20% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4);
        }
        30% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4),
                9px 9px 6px rgba(240, 122, 106, 0.3);
        }
        40% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4),
                9px 9px 6px rgba(240, 122, 106, 0.3),
                12px 12px 8px rgba(238, 99, 82, 0.2);
        }
        50% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4),
                9px 9px 6px rgba(240, 122, 106, 0.3),
                12px 12px 8px rgba(238, 99, 82, 0.2);
        }
        60% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4),
                9px 9px 6px rgba(240, 122, 106, 0.3),
                12px 12px 8px rgba(238, 99, 82, 0.2);
        }
        70% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4),
                9px 9px 6px rgba(240, 122, 106, 0.3);
        }
        80% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5),
                6px 6px 4px rgba(242, 139, 125, 0.4);
        }
        90% {
            text-shadow: 
                var(--outline-width) var(--outline-width) 0 var(--outline-color),
                calc(var(--outline-width) * -1) var(--outline-width) 0 var(--outline-color),
                var(--outline-width) calc(var(--outline-width) * -1) 0 var(--outline-color),
                calc(var(--outline-width) * -1) calc(var(--outline-width) * -1) 0 var(--outline-color),
                3px 3px 2px rgba(244, 155, 144, 0.5);
        }
        100% {
            text-shadow: none;
        }
    }

    @keyframes move {
        0% {
            transform: translate(0px, 0px);
        }
        40% {
            transform: translate(-12px, -12px);
        }
        50% {
            transform: translate(-12px, -12px);
        }
        60% {
            transform: translate(-12px, -12px);
        }
        100% {
            transform: translate(0px, 0px);
        }
    }
</style> 