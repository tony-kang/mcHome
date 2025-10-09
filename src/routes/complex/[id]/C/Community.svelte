<script>
	const facilities = [
		{ 
			icon: '💪', 
			name: '피트니스센터', 
			desc: '최신 운동기구를 갖춘 헬스장',
			image: '/main/story_sub_1.jpg'
		},
		{ 
			icon: '👶', 
			name: '키즈스테이션', 
			desc: '안전하고 즐거운 어린이 놀이공간',
			image: '/main/story_sub_2.jpg'
		},
		{ 
			icon: '🎓', 
			name: '어린이집', 
			desc: '국공립 수준의 보육시설',
			image: '/main/story_sub_3.jpg'
		},
		{ 
			icon: '🤝', 
			name: '다함께돌봄센터', 
			desc: '아이들을 위한 방과후 돌봄',
			image: '/main/story_sub_4.jpg'
		},
		{ 
			icon: '👴', 
			name: '시니어클럽', 
			desc: '어르신들의 건강과 여가활동',
			image: '/main/story_main.jpg'
		},
		{ 
			icon: '📚', 
			name: '그룹스터디룸', 
			desc: '소규모 모임을 위한 공간',
			image: '/main/story_sub_1.jpg'
		},
		{ 
			icon: '📖', 
			name: '독서실', 
			desc: '집중력 향상을 위한 학습공간',
			image: '/main/story_sub_2.jpg'
		},
		{ 
			icon: '💼', 
			name: '1인 오피스', 
			desc: '재택근무를 위한 개인 사무공간',
			image: '/main/story_sub_3.jpg'
		},
		{ 
			icon: '🏢', 
			name: '회의실', 
			desc: '비즈니스 미팅룸',
			image: '/main/story_sub_4.jpg'
		},
		{ 
			icon: '📚', 
			name: '작은도서관', 
			desc: '주민 공유 북카페',
			image: '/main/story_main.jpg'
		},
		{ 
			icon: '📦', 
			name: '무인택배함', 
			desc: '24시간 편리한 택배 보관',
			image: '/main/story_sub_1.jpg'
		},
		{ 
			icon: '🏊', 
			name: '골프연습장', 
			desc: '실내 스크린 골프',
			image: '/main/story_sub_2.jpg'
		}
	];

	let selectedFacility = $state(null);

	function selectFacility(facility) {
		selectedFacility = facility;
	}

	function closeFacility() {
		selectedFacility = null;
	}
</script>

<section class="c-section community-section">
	<div class="c-container">
		<h2 class="c-section-title">프리미엄 커뮤니티</h2>
		<p class="c-section-subtitle">
			입주민을 위한 특별한 편의시설을 경험하세요
		</p>

		<div class="facilities-grid">
			{#each facilities as facility}
				<button class="facility-card" onclick={() => selectFacility(facility)}>
					<div class="facility-icon">{facility.icon}</div>
					<h3 class="facility-name">{facility.name}</h3>
					<p class="facility-desc">{facility.desc}</p>
					<div class="facility-more">
						<span>자세히 보기</span>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</button>
			{/each}
		</div>

		<!-- 주거 서비스 안내 -->
		<div class="service-notice">
			<div class="notice-icon">
				<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
					<circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none"/>
					<path d="M24 14V26" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
					<circle cx="24" cy="32" r="2" fill="currentColor"/>
				</svg>
			</div>
			<div class="notice-content">
				<h3>단지 주거서비스 안내</h3>
				<p>단지 주거서비스는 추후 안내 예정입니다. 자세한 내용은 분양 상담을 통해 확인하실 수 있습니다.</p>
			</div>
		</div>
	</div>
</section>

<!-- 시설 상세 모달 -->
{#if selectedFacility}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="facility-modal" onclick={closeFacility}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<button class="modal-close" onclick={closeFacility} aria-label="닫기">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</button>
			<div class="modal-image">
				<img src={selectedFacility.image} alt={selectedFacility.name} />
			</div>
			<div class="modal-info">
				<div class="modal-icon">{selectedFacility.icon}</div>
				<h2>{selectedFacility.name}</h2>
				<p>{selectedFacility.desc}</p>
				<button class="c-btn c-btn-primary" onclick={closeFacility}>확인</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.community-section {
		background: white;
	}

	.facilities-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 25px;
		margin-bottom: 60px;
	}

	.facility-card {
		background: white;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		padding: 30px 20px;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.facility-card:hover {
		border-color: var(--primary-color);
		transform: translateY(-5px);
		box-shadow: var(--shadow-md);
	}

	.facility-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.facility-name {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 10px 0;
	}

	.facility-desc {
		font-size: 0.9rem;
		color: var(--text-gray);
		line-height: 1.5;
		margin: 0 0 15px 0;
	}

	.facility-more {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		color: var(--primary-color);
		font-size: 0.9rem;
		font-weight: 600;
	}

	.service-notice {
		display: flex;
		gap: 25px;
		padding: 40px;
		background: var(--bg-light);
		border-left: 4px solid var(--secondary-color);
		border-radius: 8px;
	}

	.notice-icon {
		color: var(--secondary-color);
		flex-shrink: 0;
	}

	.notice-content h3 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 10px 0;
	}

	.notice-content p {
		font-size: 1rem;
		color: var(--text-gray);
		line-height: 1.6;
		margin: 0;
	}

	/* 모달 */
	.facility-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		max-width: 600px;
		width: 100%;
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal-close {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 36px;
		height: 36px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 1;
		transition: all 0.3s ease;
	}

	.modal-close:hover {
		background: white;
		transform: rotate(90deg);
	}

	.modal-image {
		position: relative;
		width: 100%;
		aspect-ratio: 16/9;
		overflow: hidden;
	}

	.modal-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-info {
		padding: 40px;
		text-align: center;
	}

	.modal-icon {
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.modal-info h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.modal-info p {
		font-size: 1.1rem;
		color: var(--text-gray);
		line-height: 1.6;
		margin: 0 0 30px 0;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.facilities-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.facilities-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}

		.facility-card {
			padding: 25px 15px;
		}

		.facility-icon {
			font-size: 2.5rem;
		}

		.service-notice {
			flex-direction: column;
			padding: 30px;
		}

		.modal-info {
			padding: 30px 20px;
		}
	}

	@media (max-width: 480px) {
		.facilities-grid {
			grid-template-columns: 1fr;
		}

		.facility-card {
			padding: 25px 20px;
		}

		.service-notice {
			padding: 20px;
		}

		.notice-icon svg {
			width: 36px;
			height: 36px;
		}

		.notice-content h3 {
			font-size: 1.1rem;
		}

		.notice-content p {
			font-size: 0.9rem;
		}

		.modal-info h2 {
			font-size: 1.5rem;
		}

		.modal-info p {
			font-size: 1rem;
		}
	}
</style>

