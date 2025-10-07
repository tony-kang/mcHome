<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';

    // URL 파라미터
    const faqId = parseInt($page.params.id || 0);

    let loading = $state(true);
    let submitting = $state(false);

    let form = $state({
        no: faqId,
        category: '전체',
        question: '',
        answer: '',
        display_order: 0,
        is_active: 1
    });

    async function loadFaq() {
        const r = await ___prj.api.post('/s/system', 'get.faq', { no: faqId }, null);
        if (r.data.result === ___const.OK && r.data.content && r.data.content.length > 0) {
            const f = r.data.content[0];
            form.category = f.category ?? '전체';
            form.question = f.question ?? '';
            form.answer = f.answer ?? '';
            form.display_order = typeof f.display_order === 'number' ? f.display_order : 0;
            form.is_active = typeof f.is_active === 'number' ? f.is_active : 1;
        }
        loading = false;
    }

    function validate() {
        if (!form.category.trim()) return alert('카테고리를 입력하세요.'), false;
        if (!form.question.trim()) return alert('질문을 입력하세요.'), false;
        if (!form.answer.trim()) return alert('답변을 입력하세요.'), false;
        return true;
    }

    async function submitFaq(e) {
        e.preventDefault();
        if (!validate()) return;
        submitting = true;
        try {
            const r = await ___prj.api.post('/s/system', 'update.faq', null, {
                ...$state.snapshot(form)
            });
            if (r.data.result === ___const.OK) {
                alert('FAQ가 수정되었습니다.');
                goto('/faq');
            }
        } catch (err) {
            console.error('FAQ 수정 오류', err);
            alert('수정 중 오류가 발생했습니다.');
        } finally {
            submitting = false;
        }
    }

    function cancelEdit() {
        if (confirm('수정 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
            goto('/faq');
        }
    }

    onMount(loadFaq);
</script>

<Header />

<main class="faq-edit-page">
    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb">
                <a href="/">홈</a>
                <span class="separator">></span>
                <a href="/faq">FAQ</a>
                <span class="separator">></span>
                <span class="current">수정</span>
            </nav>
        </div>
    </section>

    <section class="faq-edit-section">
        <div class="container">
            <div class="edit-form-container">
                <h1>FAQ 수정</h1>
                {#if loading}
                    <div class="loading">데이터를 불러오는 중...</div>
                {:else}
                    <form onsubmit={submitFaq} class="telepasi-form faq-form">
                        <div class="form-group">
                            <label for="category">카테고리</label>
                            <input id="category" type="text" bind:value={form.category} />
                        </div>

                        <div class="form-group">
                            <label for="question">질문</label>
                            <input id="question" type="text" bind:value={form.question} />
                        </div>

                        <div class="form-group">
                            <label for="answer">답변</label>
                            <textarea id="answer" rows="8" bind:value={form.answer}></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group small">
                                <label for="display_order">노출 순서</label>
                                <input id="display_order" type="number" bind:value={form.display_order} />
                            </div>
                            <div class="form-group small">
                                <label for="is_active">노출 여부</label>
                                <select id="is_active" bind:value={form.is_active}>
                                    <option value={1}>노출</option>
                                    <option value={0}>숨김</option>
                                </select>
                            </div>
                        </div>

                        <div class="actions">
                            <button type="button" class="btn-secondary" onclick={cancelEdit} disabled={submitting}>취소</button>
                            <button type="submit" class="btn-primary" disabled={submitting}>{submitting ? '저장 중...' : '수정 완료'}</button>
                        </div>
                    </form>
                {/if}
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    .faq-edit-page { margin-top: 70px; min-height: calc(100vh - 70px); background: #f8f9fa; }

    .breadcrumb-section { padding: 20px 0; background: #fff; border-bottom: 1px solid #e9ecef; }
    .breadcrumb { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #666; }
    .breadcrumb a { color: #666; text-decoration: none; transition: color 0.3s ease; }
    .breadcrumb a:hover { color: #28a745; }
    .separator { color: #ccc; }
    .current { color: #333; font-weight: 500; }

    .faq-edit-section { padding: 40px 0; }
    .edit-form-container { background: #fff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .edit-form-container h1 { font-size: 2rem; font-weight: 700; color: #333; margin: 0 0 30px 0; text-align: center; }
    .loading { text-align: center; padding: 40px; font-size: 1.1rem; color: #666; }

    .faq-form { display: flex; flex-direction: column; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-row { display: flex; gap: 12px; }
    .form-group.small { flex: 1; }
    input[type="text"], input[type="number"], select, textarea { width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: border-color .2s ease; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #28a745; box-shadow: 0 0 0 3px rgba(40,167,69,.1); }

    .actions { display: flex; gap: 10px; justify-content: center; margin-top: 16px; }
    .btn-primary, .btn-secondary { padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; }
    .btn-primary { background: #28a745; color: #fff; }
    .btn-primary:hover { background: #20c997; }
    .btn-secondary { background: #6c757d; color: #fff; }
    .btn-secondary:hover { background: #5a6268; }

    @media (max-width: 768px) {
        .edit-form-container { padding: 25px 20px; }
        .edit-form-container h1 { font-size: 1.5rem; }
        .form-row { flex-direction: column; }
    }
</style>

