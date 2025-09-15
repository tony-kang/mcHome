<script>
    let {
        centerStyle = 'red',
        children = null,
    } = $props();
    
    const centerStyleList = {
        none: '',
        gray: 'popup-layer p-4 rounded-lg shadow-md',
        red:'popup-layer p-4 rounded-lg shadow-md text-red-500',
        error:'popup-layer p-4 rounded-lg border-2 border-red-500',
    }
</script>
<div class="flex justify-center items-center h-screen">
    <div class={centerStyleList[centerStyle]}>
        {@render children()}
    </div>
</div>