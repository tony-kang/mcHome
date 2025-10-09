<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';

	const counselorId = $page.params.id;
	let counselorData = $state(null);
	let loading = $state(true);
	let selectedService = $state(null);

	const services = [
		{
			id: 'individual',
			title: '개인 심리상담',
			duration: '50분',
			price: '80,000원',
			icon: '👤',
			description: '개인의 심리적 어려움을 다루는 1:1 상담입니다.',
			features: [
				'우울, 불안, 스트레스 관리',
				'대인관계 문제',
				'자존감 향상',
				'정서적 안정',
				'심리검사 포함 가능'
			],
			process: [
				'초기 상담 및 문제 파악',
				'상담 목표 설정',
				'정기 상담 진행',
				'변화 모니터링 및 피드백'
			]
		},
		{
			id: 'psychological-test',
			title: '종합 심리검사',
			duration: '120분',
			price: '360,000원',
			icon: '🧠',
			description: '다양한 심리검사를 통해 심층적인 자기 이해를 돕습니다.',
			features: [
				'다면적 인성검사 (MMPI)',
				'지능검사 (K-WAIS)',
				'진로탐색검사',
				'학습유형검사',
				'상세한 결과 해석 상담'
			],
			process: [
				'검사 목적 및 종류 상담',
				'심리검사 실시',
				'결과 분석 및 해석',
				'상담 및 솔루션 제공'
			]
		},
		{
			id: 'student-counseling',
			title: '학생 상담',
			duration: '50분',
			price: '150,000원',
			icon: '👨‍🎓',
			description: '학생들의 학업, 진로, 대인관계 등을 다루는 전문 상담입니다.',
			features: [
				'학업 스트레스 관리',
				'진로 및 적성 상담',
				'학교 부적응 문제',
				'또래 관계 문제',
				'학습 동기 향상'
			],
			process: [
				'학생 및 학부모 상담',
				'문제 상황 파악',
				'맞춤형 솔루션 제공',
				'지속적인 모니터링'
			]
		},
		{
			id: 'coaching',
			title: '목표달성 코칭',
			duration: '50분',
			price: '150,000원',
			icon: '🎯',
			description: '목표 설정부터 달성까지 체계적으로 지원하는 코칭 프로그램입니다.',
			features: [
				'명확한 목표 설정',
				'실행 계획 수립',
				'동기부여 및 자기계발',
				'시간 관리 전략',
				'진행 상황 점검'
			],
			process: [
				'현재 상태 진단',
				'목표 설정 및 계획 수립',
				'정기 코칭 세션',
				'목표 달성 및 평가'
			]
		}
	];

	async function loadCounselorData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.special.template.config', null, {
				counselorId: counselorId
			});

			if (r.data.result === ___const.OK) {
				counselorData = r.data.content;
			}
		} catch (error) {
			console.error('상담사 정보 로드 오류:', error);
		} finally {
			loading = false;
		}

		counselorData = {
            name: '홍길동',
            title: '심리상담 전문가',
            profile_image: 'https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020060618594303154b8488d322b9220692192.jpg',
            email: 'hong@gmail.com',
            phone: '010-1234-5678'
        };
        loading = false;
	}

	function toggleService(serviceId) {
		selectedService = selectedService === serviceId ? null : serviceId;
	}

	onMount(() => {
		loadCounselorData();
	});
</script>

<svelte:head>
	<title>서비스 - {counselorData?.name || '상담사'}</title>
</svelte:head>

{#if !loading && counselorData}
	<!-- Page Header -->
	<section class="page-header">
		<div class="t-container">
			<h1>상담 서비스</h1>
			<p>전문적이고 체계적인 심리상담 서비스를 제공합니다</p>
		</div>
	</section>

	<!-- Services Grid -->
	<section class="services-section">
		<div class="t-container">
			<div class="services-grid">
				{#each services as service}
					<div class="service-card" class:expanded={selectedService === service.id}>
						<div class="service-header" onclick={() => toggleService(service.id)}>
							<div class="service-icon">{service.icon}</div>
							<div class="service-basic">
								<h3>{service.title}</h3>
								<div class="service-meta">
									<span class="duration">⏱ {service.duration}</span>
									<span class="price">{service.price}</span>
								</div>
							</div>
							<button class="expand-btn" class:rotated={selectedService === service.id}>
								▼
							</button>
						</div>

						<p class="service-description">{service.description}</p>

						{#if selectedService === service.id}
							<div class="service-details">
								<div class="detail-section">
									<h4>포함 내용</h4>
									<ul class="feature-list">
										{#each service.features as feature}
											<li>{feature}</li>
										{/each}
									</ul>
								</div>

								<div class="detail-section">
									<h4>진행 과정</h4>
									<ol class="process-list">
										{#each service.process as step}
											<li>{step}</li>
										{/each}
									</ol>
								</div>

								<button class="btn-booking" onclick={() => goto(`/${counselorId}/booking?service=${service.id}`)}>
									이 서비스 예약하기
								</button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="process-section">
		<div class="t-container">
			<h2 class="section-title">상담 진행 절차</h2>
			<div class="process-steps">
				<div class="step">
					<div class="step-number">1</div>
					<h3>예약 신청</h3>
					<p>온라인으로 간편하게 상담 예약을 신청합니다</p>
				</div>
				<div class="step-arrow">→</div>
				<div class="step">
					<div class="step-number">2</div>
					<h3>일정 확정</h3>
					<p>상담사와 일정을 조율하여 확정합니다</p>
				</div>
				<div class="step-arrow">→</div>
				<div class="step">
					<div class="step-number">3</div>
					<h3>상담 진행</h3>
					<p>예약된 시간에 상담을 진행합니다</p>
				</div>
				<div class="step-arrow">→</div>
				<div class="step">
					<div class="step-number">4</div>
					<h3>사후 관리</h3>
					<p>필요시 추가 상담 및 피드백을 제공합니다</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="faq-section">
		<div class="t-container">
			<h2 class="section-title">자주 묻는 질문</h2>
			<div class="faq-list">
				<div class="faq-item">
					<h4>Q. 상담은 어떻게 진행되나요?</h4>
					<p>A. 대면 상담과 비대면(화상) 상담 모두 가능합니다. 예약 시 원하시는 방식을 선택하실 수 있습니다.</p>
				</div>
				<div class="faq-item">
					<h4>Q. 상담 비용은 어떻게 되나요?</h4>
					<p>A. 서비스별로 상이하며, 위 서비스 카드에 명시된 금액을 참고해주세요. 패키지 할인도 제공됩니다.</p>
				</div>
				<div class="faq-item">
					<h4>Q. 상담 내용은 비밀이 보장되나요?</h4>
					<p>A. 네, 모든 상담 내용은 철저히 비밀이 보장됩니다. 상담 윤리 규정을 준수합니다.</p>
				</div>
				<div class="faq-item">
					<h4>Q. 취소나 변경은 어떻게 하나요?</h4>
					<p>A. 상담 24시간 전까지 취소 또는 변경이 가능합니다. 연락 주시면 일정을 조율해드립니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="t-container">
			<h2>지금 바로 시작하세요</h2>
			<p>전문적인 상담으로 더 나은 내일을 만들어가세요</p>
			<button class="btn-cta" onclick={() => goto(`/${counselorId}/booking`)}>
				상담 예약하기
			</button>
		</div>
	</section>

{/if}

<style>

	.services-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.services-grid {
		display: grid;
		gap: 30px;
	}

	.service-card {
		background: white;
		border-radius: 16px;
		padding: 30px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
	}

	.service-card:hover {
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.service-card.expanded {
		box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
	}

	.service-header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 20px;
		align-items: center;
		cursor: pointer;
	}

	.service-icon {
		font-size: 3rem;
	}

	.service-basic h3 {
		font-size: 1.8rem;
		margin: 0 0 10px 0;
		color: #333;
	}

	.service-meta {
		display: flex;
		gap: 20px;
		font-size: 1rem;
		color: #666;
	}

	.price {
		font-weight: 700;
		color: #667eea;
		font-size: 1.2rem;
	}

	.expand-btn {
		background: #667eea;
		color: white;
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.2rem;
	}

	.expand-btn.rotated {
		transform: rotate(180deg);
	}

	.service-description {
		margin: 20px 0;
		color: #666;
		line-height: 1.6;
	}

	.service-details {
		margin-top: 30px;
		padding-top: 30px;
		border-top: 2px solid #f0f0f0;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.detail-section {
		margin-bottom: 30px;
	}

	.detail-section h4 {
		font-size: 1.3rem;
		margin: 0 0 15px 0;
		color: #333;
	}

	.feature-list,
	.process-list {
		margin: 0;
		padding-left: 25px;
	}

	.feature-list li,
	.process-list li {
		padding: 8px 0;
		color: #666;
		line-height: 1.6;
	}

	.btn-booking {
		width: 100%;
		padding: 15px;
		background: #667eea;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 20px;
	}

	.btn-booking:hover {
		background: #764ba2;
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
	}

	.process-section {
		padding: 80px 0;
		background: white;
	}


	.process-steps {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	.step {
		flex: 1;
		min-width: 200px;
		text-align: center;
		padding: 30px;
		background: #f8f9fa;
		border-radius: 16px;
	}

	.step-number {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 auto 20px;
	}

	.step h3 {
		font-size: 1.3rem;
		margin: 0 0 10px 0;
		color: #333;
	}

	.step p {
		color: #666;
		line-height: 1.6;
		margin: 0;
	}

	.step-arrow {
		font-size: 2rem;
		color: #667eea;
		font-weight: 700;
	}

	.faq-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.faq-list {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-item {
		background: white;
		padding: 30px;
		border-radius: 12px;
		margin-bottom: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.faq-item h4 {
		font-size: 1.2rem;
		margin: 0 0 15px 0;
		color: #333;
	}

	.faq-item p {
		color: #666;
		line-height: 1.6;
		margin: 0;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.cta-section h2 {
		font-size: 2.5rem;
		margin: 0 0 15px 0;
	}

	.cta-section p {
		font-size: 1.3rem;
		margin: 0 0 40px 0;
		opacity: 0.9;
	}

	.btn-cta {
		padding: 20px 50px;
		background: white;
		color: #667eea;
		border: none;
		border-radius: 50px;
		font-size: 1.3rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.btn-cta:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.service-header {
			grid-template-columns: auto 1fr;
			gap: 15px;
		}

		.expand-btn {
			grid-column: 1 / -1;
			width: 100%;
			border-radius: 8px;
		}

		.process-steps {
			flex-direction: column;
		}

		.step-arrow {
			transform: rotate(90deg);
		}
	}
</style>
