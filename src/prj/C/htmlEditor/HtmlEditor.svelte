<script>
    import FroalaEditor from './froala/FroalaEditor.svelte';

    let {
        value = '',
        cssClass = 'mt-1',
        onChange = null,
        option = {},
    } = $props();
</script>

<FroalaEditor bind:value={value} {cssClass} {onChange} {option}/>