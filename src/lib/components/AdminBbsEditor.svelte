<script>
    import { onMount } from 'svelte';
    import NoticeForm from '$lib/components/NoticeForm.svelte';
    import { goto } from '$app/navigation';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';
    import { ___decodeHtml } from '$prj/lib/i_telepasi';

    // 통합 BBS 에디터: 작성/수정을 한 컴포넌트에서 처리
    // Props
    let {
        bbsId = 'notice',       // 게시판 ID (예: 'notice')
        postId = 0,             // 0이면 작성, 그 외에는 수정
        redirectTo = '/notice',  // 완료 후 이동 경로
        title = ''               // 상단 제목 (옵션)
    } = $props();

    let submitting = $state(false);
    let loading = $state(postId > 0);

    let noticeContent = $state({
        bbsId,
        postId: postId || 0,
        postTitle: '',
        postData: '',
        postTag: '',
        postStartDate: '',
        postEndDate: '',
        uploadId: null,
        postCategory: 'general',
        important: false
    });

    onMount(async () => {
        if (postId > 0) {
            const r = await ___prj.api.post(___const.API_BBS, 'get.post', { bbsId, postId }, null);
            if (r.data.result === ___const.OK && r.data.content?.length) {
                const n = r.data.content[0];
                noticeContent.postId = n.id;
                noticeContent.postTitle = n.title ?? '';
                noticeContent.postData = ___decodeHtml(n.content ?? '');
                noticeContent.postTag = n.tag ?? '';
                noticeContent.postStartDate = (n.post_start_date || '').slice(0, 10);
                noticeContent.postEndDate = (n.post_end_date || '').slice(0, 10);
                noticeContent.uploadId = n.upload_id ?? null;
                noticeContent.postCategory = n.category ?? 'general';
                noticeContent.important = n.important ?? false;
            }
            loading = false;
        }
    });

    async function handleSubmit(data) {
        submitting = true;
        try {
            console.log('write.post data', $state.snapshot(data));
            const r = await ___prj.api.post(___const.API_BBS, 'write.post', null, data);
            if (r.data.result === ___const.OK) {
                alert(postId > 0 ? '수정이 완료되었습니다.' : '등록이 완료되었습니다.');
                goto(redirectTo);
            }
        } finally {
            submitting = false;
        }
    }

    function handleCancel() {
        if (confirm('변경 사항이 저장되지 않습니다. 취소하시겠습니까?')) {
            goto(redirectTo);
        }
    }

    function resetForm() {
        noticeContent.postTitle = '';
        noticeContent.postCategory = 'general';
        noticeContent.important = false;
        noticeContent.postData = '';
        noticeContent.postStartDate = '';
        noticeContent.postEndDate = '';
    }
</script>

{#if title}
    <h1 class="bbs-editor-title">{title}</h1>
{/if}

{#if loading}
    <div class="loading">데이터를 불러오는 중...</div>
{:else}
    <NoticeForm 
        bind:noticeData={noticeContent}
        bind:submitting={submitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onReset={resetForm}
        submitButtonText={postId > 0 ? '수정 완료' : '저장'}
        cancelButtonText="취소"
        showResetButton={postId === 0}
    />
{/if}

<style>
    .bbs-editor-title {
        font-size: 2rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 30px 0;
        text-align: center;
    }

    .loading {
        text-align: center;
        padding: 40px;
        font-size: 1.1rem;
        color: #666;
    }

    @media (max-width: 768px) {
        .bbs-editor-title { font-size: 1.5rem; }
    }
</style>


