<script>
	import { onMount } from 'svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { g_logedIn, g_theme } from '$prj/prjStore';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
	let prjInit = $state(false);

	onMount(async () => {
		await ___prj.init();
		prjInit = true;

		console.log('g_logedIn', $g_logedIn);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>
<SvelteToast />
{#if prjInit}
	{@render children()}
{:else}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>사용자 정보를 불러오는 중...</p>
	</div>
{/if}
