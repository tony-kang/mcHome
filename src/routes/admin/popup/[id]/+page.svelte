<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import ___prjConst from '$prj/prjConst';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { ___formatDate, ___decodeHtml } from '$prj/lib/i_telepasi';
	import AdminPageHeader from '$prj/C/admin/AdminPageHeader.svelte';

	// URL에서 ID 가져오기
    const noticeId = parseInt($page.params.id || 0);
	

	let notice = $state(null);
	let viewTimer = null;
    const bbsId = 'popup';
	const postId = noticeId;

	onMount(async () => {
		const r = await ___prj.api.post(___const.API_BBS ,'get.post' ,{bbsId, postId} ,null);
		if (r.data.result === ___const.OK) {
			notice = r.data.content[0];
			// console.log('popup detail', $state.snapshot(notice));


			// 게시물 진입 VIEW_COUNT_TIME ms후 조회수 증가
			viewTimer = setTimeout(async () => {
				const storageKey = `pv_${postId}`;
				const lastViewTime = ___prj.storage.getItem(storageKey);
				const now = Date.now();

				// 3시간 이내 재조회인지 체크
				if (lastViewTime) {
					const timeDiff = now - parseInt(lastViewTime);
					const threeHours = ___const.VIEW_COUNT_THRESHOLD * 60 * 1000; // 분단위
					if (timeDiff < threeHours) return;
				}

				// 조회수 증가 API 호출
				const r = await ___prj.api.post(___const.API_BBS, 'increase.count', null, { bbsId, postId, countType:___const.VIEW_COUNT_TYPE });
				if (r.data.result === ___const.OK) {
					___prj.storage.setItem(storageKey, now.toString());
				}
			}, ___const.VIEW_COUNT_TIME); // 5초 대기
		}

		return () => clearTimeout(viewTimer);
	});
</script>

<svelte:head>
    <title>{notice ? notice.title : '시스템 팝업'} - 마인드코딩</title>
    <meta name="description" content={notice ? notice.content.replace(/<[^>]*>/g, '').substring(0, 150) : '마인드코딩 시스템 팝업'} />
</svelte:head>

<main class="notice-detail-page">
	{#if notice}
		<!-- Notice Detail -->
		<section class="notice-detail-section">
			<div class="container">
				<AdminPageHeader title="시스템 팝업 상세" />
				<article class="notice-detail">
					<!-- Notice Header -->
					<header class="notice-header">
						<div class="notice-title-wrapper">
							{#if notice.important}
								<span class="important-badge">중요</span>
							{/if}
							<h1 class="notice-title">{notice.title}</h1>
						</div>
						<div class="notice-meta">
							<div class="meta-info">
								<div class="meta-item">
									<span class="meta-label">작성자:</span>
									<span class="meta-value">{notice.reg_user_name}</span>
								</div>
								<div class="meta-item">
									<span class="meta-label">작성일:</span>
									<span class="meta-value">{___formatDate(notice.reg_date)}</span>
								</div>
								<div class="meta-item">
									<span class="meta-label">조회수:</span>
									<span class="meta-value">{notice.view_cnt}</span>
								</div>
							</div>
							{#if ___prj.isAdmin}
                                <a href="/admin/popup/edit/{notice.id}" class="edit-btn">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									수정
								</a>
							{/if}
						</div>
					</header>

					<!-- Notice Content -->
					<div class="notice-content fr-view">
						{@html ___decodeHtml(notice.content)}
					</div>

					<!-- Notice Footer -->
					<footer class="notice-footer">
						<div class="notice-actions">
                            <a href="/admin/popup" class="btn-secondary">목록으로</a>
							<!-- <button class="btn-primary" onclick={() => window.print()}>인쇄</button> -->
						</div>
					</footer>
				</article>
			</div>
		</section>
	{:else}
		<!-- Not Found -->
		<section class="not-found-section">
			<div class="container">
				<div class="not-found-content">
                    <h1>시스템 팝업을 찾을 수 없습니다</h1>
                    <p>요청하신 팝업이 존재하지 않거나 삭제되었습니다.</p>
                    <a href="/admin/popup" class="btn-primary">팝업 목록으로</a>
				</div>
			</div>
		</section>
	{/if}
</main>

<style>
	.notice-detail {
		background: #fff;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.notice-header {
		padding: 40px;
		border-bottom: 1px solid #e9ecef;
		background: #f8f9fa;
	}

	.notice-title-wrapper {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 20px;
		justify-content: space-between;
	}

	.important-badge {
		background: #dc3545;
		color: #fff;
		padding: 6px 16px;
		border-radius: 16px;
		font-size: 0.9rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.notice-title {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		line-height: 1.4;
		flex: 1;
	}

	.edit-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 2px 16px;
		background: #28a745;
		color: #fff;
		text-decoration: none;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 600;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.edit-btn:hover {
		background: #20c997;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
	}

	.edit-btn svg {
		width: 16px;
		height: 16px;
	}

	.notice-meta {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.meta-info {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.meta-label {
		color: #666;
		font-weight: 500;
	}

	.meta-value {
		color: #333;
		font-weight: 600;
	}

	.notice-content {
		padding: 40px;
		line-height: 1.8;
		color: #333;
	}

	.notice-footer {
		padding: 30px 40px;
		border-top: 1px solid #e9ecef;
		background: #f8f9fa;
	}

	.notice-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
	}

	.btn-primary,
	.btn-secondary {
		padding: 12px 30px;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
	}

	.btn-primary {
		background: #28a745;
		color: #fff;
	}

	.btn-primary:hover {
		background: #20c997;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #6c757d;
		color: #fff;
	}

	.btn-secondary:hover {
		background: #5a6268;
		transform: translateY(-2px);
	}

	.not-found-section {
		padding: 100px 0;
		background: #fff;
		text-align: center;
	}

	.not-found-content h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 20px 0;
	}

	.not-found-content p {
		font-size: 1.2rem;
		color: #666;
		margin: 0 0 40px 0;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.notice-title {
			font-size: 1.5rem;
		}

		.notice-title-wrapper {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.edit-btn {
			align-self: flex-end;
			padding: 8px 12px;
			font-size: 0.8rem;
		}

		.edit-btn svg {
			width: 14px;
			height: 14px;
		}

		.notice-meta {
			flex-direction: column;
			gap: 15px;
			align-items: flex-start;
		}

		.meta-info {
			flex-direction: column;
			gap: 15px;
		}

		.edit-btn {
			align-self: flex-end;
		}

		.notice-header,
		.notice-content,
		.notice-footer {
			padding: 25px 20px;
		}

		.notice-actions {
			flex-direction: column;
		}

	}
</style>
