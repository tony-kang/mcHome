<script>
    import { onMount } from 'svelte';
    
    let {
        text = '',
        speed = 50,
        fontSize = '40px',
        padding = '100px 100px 0px 100px',
        repeat = true,
        delay = 2000,
        cursorChar = '|',
        cursorSpeed = 500,
        fadeInDuration = 0.5,
        fadeInDelay = 0,
        cursorColor = 'currentColor',
        textColor = 'inherit',
        fontFamily = 'inherit',
        fontWeight = 'bold',
        textAlign = 'center',
        cursorWidth = '2px',
        cursorMargin = '2px'
    } = $props();
    
    let displayText = $state('');
    let currentIndex = $state(0);
    let showCursor = $state(true);
    let isTyping = $state(true);
    
    // 커서 깜빡임 효과
    onMount(() => {
        const cursorInterval = setInterval(() => {
            showCursor = !showCursor;
        }, 500);
        
        return () => clearInterval(cursorInterval);
    });
    
    // 타이핑 효과
    function startTyping() {
        currentIndex = 0;
        displayText = '';
        isTyping = true;
        
        const typingInterval = setInterval(() => {
            if (currentIndex < text.length) {
                displayText += text[currentIndex];
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                isTyping = false;
                
                if (repeat) {
                    setTimeout(() => {
                        startTyping();
                    }, delay);
                }
            }
        }, speed);
    }
    
    onMount(() => {
        startTyping();
    });
</script>

<div class="typewriter-container" style="font-size: {fontSize}; padding: {padding};">
    <h1 class="text-center font-bold mx-auto relative inline-block typewriter-text">
        {displayText}
        {#if showCursor && isTyping}
            <span class="cursor">{cursorChar}</span>
        {/if}
    </h1>
</div>

<style>
    .typewriter-container {
        opacity: 0;
        animation: fadeIn 0.5s ease-in forwards;
        overflow-x: auto;
    }
    
    .typewriter-text {
        white-space: nowrap;
        display: inline-block;
    }
    
    .cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background-color: currentColor;
        margin-left: 2px;
        animation: blink 0.5s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style> 