<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import ComplexHeader from './C/ComplexHeader.svelte';
	import ComplexFooter from './C/ComplexFooter.svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import './complex.css';
	
	let { children } = $props();
	const complexId = $derived($page.params.id);
	let complexData = $state(null);

	async function loadComplexData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.complex.config', null, {
				complexId: complexId
			});

			if (r.data.result === ___const.OK) {
				complexData = r.data.content;
			}
		} catch (error) {
			console.error('단지 정보 로드 오류:', error);
		}

		// 임시 데이터 (개발용)
		complexData = {
			name: '센터스퀘어 발산',
			slogan: '신분당선 탄다 · 센터스퀘어 발산 산다',
			subSlogan: '수지를 빛내는 센터스퀘어 발산 타운, 나의 프라이드가 되다!',
			phone: '02-1234-5678',
			address: '서울특별시 강서구 공항대로 302',
			developer: '온동네(주)',
			constructor: '온동네(주)',
			status: 'presale' // presale(분양), contract(청약), move_in(입주)
		};
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<Header />
<ComplexHeader {complexId} {complexData} />
{@render children()}
<ComplexFooter {complexData} />

