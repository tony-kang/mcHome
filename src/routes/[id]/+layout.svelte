<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import TemplateHeader from '$src/routes/[id]/C/TemplateHeader.svelte';
    import TemplateFooter from '$src/routes/[id]/C/TemplateFooter.svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';
    import './template.css';
    
    let { children } = $props();
    const counselorId = $derived($page.params.id);
    let counselorName = $state('상담사');

    async function loadCounselorData() {
        try {
            const r = await ___prj.api.post('/s/system', 'get.special.template.config', null, {
                counselorId: counselorId
            });

            if (r.data.result === ___const.OK) {
                counselorName = r.data.content?.name || '상담사';
            }
        } catch (error) {
            console.error('상담사 정보 로드 오류:', error);
        }
    }

    onMount(() => {
        loadCounselorData();
    });
</script>

<Header />
<TemplateHeader {counselorId} />
{@render children()}
<TemplateFooter {counselorName} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
	}
</style>
