<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import ___localStorage from '$prj/lib/i_localStorage';
	// import ___encDec from '$prj/lib/i_encDec';
	import { g_logedIn, g_theme } from '$prj/prjStore';
	import favicon from '$lib/assets/favicon.svg';

	const counselorId = $page.params.id;
    let _tData = $state(null);  // 특별 템플릿 데이터

    async function loadSpecialTemplateConfig() {
		const r = await ___prj.api.post('/s/system', 'get.special.template.config', null, {
			counselorId: counselorId
		});

		if (r.data.result === ___const.OK) {
			_tData = r.data.content;
			console.log('_tData',$state.snapshot(_tData));
		}
	}

	onMount(() => {
		loadSpecialTemplateConfig();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>

<div class="container">
	<h1>Hello {counselorId}</h1>
</div>