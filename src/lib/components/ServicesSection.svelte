<script>
	let currentCategory = 'all';
	let currentType = 'individual';
	
	// 모달 상태
	let showInquiry = $state(false);
	let showDetail = $state(false);
	let selectedService = $state(null);

	const categories = [
		{ id: 'all', label: '전체' },
		{ id: 'psychological', label: '심리' },
		{ id: 'learning', label: '학습' },
		{ id: 'relationship', label: '관계' },
		// { id: 'business', label: '비즈니스' }
	];

	const types = [
		{ id: 'individual', label: '개인' },
		// { id: 'corporate', label: '기업' }
	];

	// 필터링 함수들
	function setCategory(categoryId) {
		currentCategory = categoryId;
		updateFilteredServices();
	}

	function setType(typeId) {
		currentType = typeId;
		updateFilteredServices();
	}

	// 모달 함수들
	function showInquiryModal(service) {
		selectedService = service;
		showInquiry = true;
	}

	function showDetailModal(service) {
		selectedService = service;
		showDetail = true;
	}

	function closeModals() {
		showInquiry = false;
		showDetail = false;
		selectedService = null;
	}

	function switchToInquiryModal() {
		showDetail = false;
		// selectedService는 유지하고 상담 문의 모달만 열기
		showInquiry = true;
	}

	function switchToDetailModal() {
		showInquiry = false;
		// selectedService는 유지하고 자세히 보기 모달만 열기
		showDetail = true;
	}

	const services = {
		psychological: [
			{
				name: 'PTI:CODE 심리재능 검사',
				description: 'PTI(Psychometric Talent Inventory)는 개인이 타고난 심리기질·심리기능·심리재능을 종합적으로 진단하는 심리재능 진단 도구입니다.',
				category: 'psychological',
				type: 'individual',
				icon: '🧠',
				features: ['심리기질 분석', '심리기능 진단', '심리재능 발굴', '맞춤형 성장 로드맵'],
				details: {
					overview: '사람은 누구나 고유한 심리코드(Code)를 가지고 태어나며, PTI는 이 코드를 해석하여 학습, 진로, 관계, 비즈니스 등 삶의 전 영역에서 활용할 수 있는 맞춤형 성장 전략을 제시합니다.',
					targets: [
						{
							name: '영유아',
							service: '심리기질 행동특성 검사',
							effects: [
								'아이가 타고난 기질과 성향을 조기에 파악해 발달 단계에 맞는 양육 방향을 제시',
								'문제 행동(떼쓰기, 공격성, 과잉행동 등)의 원인을 이해하고 맞춤형 지도 방안을 마련',
								'정서 발달 상태를 확인하여 안정적인 애착 형성과 자기조절 능력을 돕는',
								'부모가 자녀의 심리·행동 특성을 객관적으로 이해함으로써 양육 스트레스와 갈등을 줄임',
								'아이가 지닌 잠재 재능과 강점을 일찍 발견해 긍정적 성장의 기초를 세움'
							]
						},
						{
							name: '아동·청소년',
							service: '학습·진로·입시 전략 검사',
							effects: [
								'자녀의 타고난 기질과 학습 성향을 객관적으로 파악하여, 막연한 공부법이 아닌 자녀에게 맞는 학습 전략을 제시',
								'강점 과목과 취약 과목을 구체적으로 구분해, 학부모님이 자녀 학습 방향을 지도하는 데 실질적인 기준이 됨',
								'자녀의 흥미와 적성을 반영한 전공·계열 선택 로드맵을 제공하여, 중·장기적인 진로 고민을 덜어드림',
								'단순 성적 관리가 아니라 학생부, 비교과, 면접 준비까지 연계된 입시 전략을 세울 수 있도록 지원',
								'학습·진로·입시를 통합적으로 바라봄으로써, 자녀가 흔들리지 않고 꾸준히 성장할 수 있는 계획을 마련'
							]
						},
						// {
						// 	name: '취준생/직장인/창업가',
						// 	service: '커리어·브랜딩·세일즈 매니지먼트 검사',
						// 	effects: [
						// 		'개인의 강점과 잠재 역량을 기반으로 최적의 커리어 방향을 설정',
						// 		'직무 적합성과 역량 갭을 분석하여, 취업·승진·이직 준비 전략을 구체적으로 세움',
						// 		'본인의 특성과 강점을 살린 차별화된 자기 브랜딩을 완성',
						// 		'직무·산업에 맞춘 세일즈 및 퍼포먼스 전략을 수립하여, 성과 창출 역량을 높임',
						// 		'취준생에게는 합격 가능성 강화, 직장인에게는 성과와 커리어 성장, 창업가에게는 브랜드 경쟁력 및 매출 향상'
						// 	]
						// },
						{
							name: '학부모',
							service: '양육·소통 검사',
							effects: [
								'자녀의 기질과 심리적 특성을 이해하여 자녀 맞춤형 양육 방향을 세움',
								'부모-자녀 간의 소통 패턴을 진단해 갈등의 원인을 파악하고 개선 방안을 찾음',
								'자녀 발달 단계에 적합한 효과적인 대화법과 지도 방법을 익힘',
								'부모 자신의 양육 스타일을 객관적으로 돌아보고 불필요한 양육 스트레스를 줄임',
								'건강한 부모-자녀 관계를 바탕으로 자녀의 정서 안정과 자존감 발달을 지원'
							]
						},
						// {
						// 	name: '성인',
						// 	service: '부부,연예,재회 심리소통 검사',
						// 	effects: [
						// 		'서로의 심리기질과 소통 방식을 객관적으로 이해하여 불필요한 갈등을 줄임',
						// 		'관계에서 반복되는 패턴(예: 대화 단절, 감정 폭발 등)을 파악하고 개선 방안을 찾음',
						// 		'공감과 표현의 균형을 회복해 안정적이고 성숙한 관계를 만들어감',
						// 		'재회 상담의 경우, 과거의 갈등 원인을 명확히 분석하고 새로운 관계 형성의 기초를 마련',
						// 		'장기적으로는 신뢰·애착·친밀감을 강화하여 관계 지속 가능성을 높임'
						// 	]
						// }
					]
				}
			},
			{
				name: '심리재능 코칭',
				description: '심리재능을 기반으로 한 자기이해와 자기성장의 여정을 함께합니다.',
				category: 'psychological',
				type: 'individual',
				icon: '💭',
				features: ['심리재능 코칭', '스트레스 관리', '자기인식 향상', '정서 조절'],
				details: {
					overview: 'PTI:CODE 검사를 통해 파악된 개인의 심리재능을 바탕으로, 맞춤형 심리 코칭을 제공합니다.',
					targets: [
						{
							name: '영유아',
							service: '정서발달·행동수정 지원',
							content: '놀이와 관찰을 통해 아이의 정서 상태와 행동 패턴을 파악하고, 부정적 행동을 줄이며 긍정적 습관을 형성할 수 있도록 지도합니다.',
							method: 'PTI:CODE 유아용 검사, 부모 상담, 행동 분석(ABC 기법), 감정 표현 훈련, 생활 루틴 조정',
							effects: ['정서 안정', '문제 행동 감소', '자기조절 능력 발달']
						},
						{
							name: '아동·청소년',
							service: '멘탈코칭 & 자기이해 상담코칭',
							content: '학습 스트레스, 시험 불안, 또래관계 문제 등 청소년기의 심리적 부담을 관리하고, 자기 이해를 돕는 상담 코칭을 제공합니다.',
							method: 'PTI:CODE 검사, 1:1 멘탈코칭, 자기이해 상담, 학습·진로 동기 부여 프로그램',
							effects: ['자신감 회복', '학습·진로 방향성 강화', '긍정적 자기인식 형성']
						},
						{
							name: '학부모',
							service: '부모·자녀 심리재능 코칭',
							content: '부모-자녀 간 소통 방식을 점검하고, 자녀의 심리기질에 맞는 양육 및 소통 방법을 제안합니다.',
							method: '부모·자녀 PTI:CODE 검사 비교, 심리재능 코칭 세션, 가족 대화 훈련, 부모 교육 워크숍',
							effects: ['양육 갈등 감소', '자녀 이해 증진', '건강한 가족관계 구축']
						},
						{
							name: '성인',
							service: '자기이해 재능경영코칭',
							content: '자신의 기질과 재능을 정확히 이해하고, 커리어·인간관계·삶의 방향을 전략적으로 설계하도록 돕는 코칭',
							method: 'PTI:CODE 검사, 자기이해 프로파일링, 커리어 매니지먼트 상담, 재능 기반 목표 설계',
							effects: ['자기 이해 심화', '커리어 방향 설정', '성과와 만족을 동시에 높이는 자기경영 능력 강화']
						},
						{
							name: '워크숍',
							service: '마음회복 프로그램',
							content: '스트레스·무기력·정서적 소진에서 회복하도록 돕는 집단 프로그램',
							method: '심리회복 워크숍, 마음챙김 훈련, 표현예술 활동(글쓰기, 미술, 음악), 그룹 대화 & 피드백 세션',
							effects: ['정서적 안정 회복', '긍정적 에너지 충전', '관계 속에서 함께 치유되는 경험']
						}
					]
				}
			}
		],
		learning: [
			{
				name: '학습진로 컨설팅',
				description: 'PTI:CODE를 기반으로 한 맞춤형 학습 전략과 진로 설계를 제공합니다.',
				category: 'learning',
				type: 'individual',
				icon: '📚',
				features: ['학습 스타일 진단', '집중력 분석', '기억력 패턴', '맞춤 학습법'],
				details: {
					overview: '개인의 심리재능을 바탕으로 최적의 학습 방법과 진로 방향을 제시합니다.',
					targets: [
						{
							name: '아동·청소년',
							service: '학습컨설팅',
							content: '학습 성향 분석(집중/기억/동기), 과목별 전략 설계, 시간관리·시험전략·루틴 구축, 부모와의 학습 커뮤니케이션 가이드',
							method: 'PTI:CODE 학습 프로파일 + 성취 데이터(성적표/모의고사) 분석 → 1:1 코칭(주 1회, 4~8주) → 과목별 미션/주간 플랜 → 중간 점검 & 리포트',
							effects: ['자기주도 학습 루틴 정착', '과목별 취약점 보완·강점 강화', '시험 대비 체계 확보', '학습 스트레스 감소']
						},
						{
							name: '아동·청소년',
							service: '입시컨설팅',
							content: '전공 적합성·계열 매칭, 학생부 스토리라인 설계, 비교과/활동 포트폴리오 기획, 논술/면접 전략',
							method: 'PTI:CODE 진로 적합 진단 → 학생부·활동 분석 → 목표 대학/전형 맵핑 → 자소서/활동 기획 워크숍 → 모의면접/피드백(4~12주 트랙)',
							effects: ['전형별 강점 극대화', '일관된 지원 스토리 구축', '합격 가능성 제고', '일정·준비물 관리 체계화']
						},
						{
							name: '취업준비생',
							service: '커리어 매니지먼트',
							content: '강점 기반 직무 매칭, 역량 갭 분석·보완 로드맵, 프로젝트/인턴 전략, 브랜딩(이력서·자기소개서·링크드인), 면접 퍼포먼스',
							method: 'PTI:CODE × 직무 매트릭스 진단 → STAR 사례 도출 워크숍 → 이력서/자소서 클리닉 → 모의면접(영상 피드백) → 네트워킹·지원 일정 관리(4~8주)',
							effects: ['커리어 방향 명확화', '서류 통과율·면접 합격률 향상', '차별화된 개인 브랜딩', '지속 가능한 구직 루틴 구축']
						},
						{
							name: '캠프',
							service: '학습 캠프',
							content: '핵심 학습법(집중·기억·문제풀이) 훈련, 시험전략 실습, 협업 프로젝트로 자기주도·책임감 강화',
							method: '2~3일 집중 또는 1주 코스 / RPM 이론·실습, RPM 실전 스터디 & 코칭 / PTI:CODE 기반 팀빌딩 / 일일 피드백·루브릭 / 최종 개인 학습플랜 발표',
							effects: ['즉시 적용 가능한 공부법 체득', '동기 상승', '실전 시험대응력 향상', '캠프 이후 4주 실행계획 확보']
						},
						{
							name: '캠프',
							service: '진로 캠프',
							content: '직무·산업 트렌드 탐색, 전공·진로 매칭, 현업 멘토링, 미니 프로젝트·포트폴리오 기획',
							method: 'PTI:CODE 진로검사 → 진로 매칭 워크숍 → 멘토 토크/패널 Q&A → 팀 프로젝트 → 포트폴리오 피드백 & 발표',
							effects: ['진로 확신도 상승', '지원 전략 구체화', '실전형 포트폴리오 초안 완성', '멘토·동료 네트워크 형성']
						}
					]
				}
			}
		],
		relationship: [
			{
				name: '관계소통 코칭',
				description: 'PTI:CODE를 바탕으로 한 효과적인 인간관계 구축과 소통 방법을 제시합니다.',
				category: 'relationship',
				type: 'individual',
				icon: '👨‍👩‍👧‍👦',
				features: ['관계 패턴 분석', '소통 스킬', '갈등 관리', '네트워킹'],
				details: {
					overview: '개인의 심리기질과 소통 스타일을 이해하여 건강한 관계를 형성하고 유지할 수 있도록 돕습니다.',
					targets: [
						{
							name: '가족',
							service: '부모·자녀 소통',
							content: '자녀의 기질과 심리재능을 기반으로, 효과적인 대화법과 양육 소통 전략을 제시',
							method: '부모·자녀 PTI:CODE 비교 진단 → 부모·자녀 대화 유형 분석 → 맞춤형 코칭 및 실습 → 가정 내 실천 과제 제안',
							effects: ['부모·자녀 간 갈등 감소', '상호 이해 증진', '안정적 애착 관계 형성']
						},
						// {
						// 	name: '성인',
						// 	service: '신혼부부·연애·재회 상담',
						// 	content: '서로의 기질 차이를 이해하고, 건강한 소통 방식과 갈등 해결 전략을 제공',
						// 	method: 'PTI:CODE 커플 매칭 검사 → 관계 패턴 분석 → 1:1 혹은 커플 상담 코칭 → 상황별 소통 훈련 & 감정 표현 실습',
						// 	effects: ['신뢰와 공감 회복', '갈등 해결 능력 향상', '관계 지속 가능성 강화']
						// },
						// {
						// 	name: '조직/기업',
						// 	service: '팀빌딩 프로그램',
						// 	content: '구성원의 심리재능을 기반으로 역할을 배분하고, 팀워크·리더십·협력 역량을 강화',
						// 	method: '조직 구성원 PTI:CODE 진단 → 팀 성향 매트릭스 분석 → 협업 시뮬레이션 & 그룹 액티비티 → 성과·피드백 세션',
						// 	effects: ['조직 내 신뢰 구축', '협업 효율성 증대', '팀 성과 및 몰입도 향상']
						// },
						// {
						// 	name: '워크숍',
						// 	service: '소통·협력 프로그램',
						// 	content: '공감적 대화, 협력적 문제 해결, 관계 스트레스 완화 훈련',
						// 	method: '그룹 워크숍(2~8시간), 대화 훈련·롤플레잉·케이스 스터디, 피드백 순환 구조, 실천 루틴 제시',
						// 	effects: ['원활한 의사소통 능력 향상', '협력 기반 문제해결력 강화', '긍정적 관계 경험 확산']
						// }
					]
				}
			}
		]
	};

	// 모든 서비스를 하나의 배열로 합치기
	let allServices = [];
	Object.values(services).forEach(serviceArray => {
		allServices = allServices.concat(serviceArray);
	});

	// 필터링된 서비스 계산 (반응형 변수)
	let filteredServices = $state([]);

	// 필터링 함수
	function updateFilteredServices() {
		let items = [...allServices];
		
		// 카테고리 필터링
		if (currentCategory !== 'all') {
			items = items.filter(item => item.category === currentCategory);
		}
		
		// 타입 필터링
		items = items.filter(item => item.type === currentType);
		
		filteredServices = items;
		console.log('Filtered services:', items.length, currentCategory, currentType);
	}

	// 초기 로드 및 상태 변화 시 필터링 업데이트
	$effect(() => {
		updateFilteredServices();
	});
</script>

<section class="services-section">
	<div class="container">
		<div class="section-header">
			<h2>마인드코딩 서비스</h2>
			<p>심리재능을 기반으로 한 네 가지 영역의 맞춤형 성장 솔루션</p>
		</div>

		<!-- Type Filter -->
		<!-- <div class="type-filter">
			{#each types as type}
				<button 
					class="type-button" 
					class:active={currentType === type.id}
					onclick={() => setType(type.id)}
				>
					{type.label}
				</button>
			{/each}
		</div> -->

		<!-- Category Filter -->
		<div class="category-filter">
			{#each categories as category}
				<button 
					class="category-button" 
					class:active={currentCategory === category.id}
					onclick={() => setCategory(category.id)}
				>
					{category.label}
				</button>
			{/each}
		</div>

		<!-- Services Grid -->
		<div class="services-grid">
			{#each filteredServices as service}
				<div class="service-card">
					<div class="service-icon">{service.icon}</div>
					<div class="service-info">
						<h3 class="service-name">{service.name}</h3>
						<p class="service-description">{service.description}</p>
						<div class="service-features">
							{#each service.features as feature}
								<span class="feature-tag">{feature}</span>
							{/each}
						</div>
						<div class="service-actions">
							<button class="btn-inquiry" onclick={() => showInquiryModal(service)}>상담 문의</button>
							<button class="btn-detail" onclick={() => showDetailModal(service)}>자세히 보기</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="cta-section">
			<div class="cta-content">
				<h3>나만의 심리재능을 발견하고 싶다면?</h3>
				<p>PTI:CODE 검사로 시작하는 맞춤형 성장 여정</p>
				<div class="cta-buttons">
					<button class="btn-primary">검사 시작하기</button>
					<button class="btn-secondary">무료 상담 신청</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 상담 문의 모달 -->
{#if showInquiry && selectedService}
	<div class="modal-overlay" onclick={closeModals} onkeydown={(e) => e.key === 'Enter' && closeModals()} role="button" tabindex="0">
		<div class="modal-content" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.key === 'Enter' && e.stopPropagation()} role="dialog" tabindex="-1">
			<div class="modal-header">
				<h3>{selectedService.name} 상담 문의</h3>
				<button class="modal-close" onclick={closeModals}>×</button>
			</div>
			<div class="modal-body">
				<div class="inquiry-form">
					<div class="form-group">
						<label for="inquiry-name">이름 *</label>
						<input id="inquiry-name" type="text" placeholder="이름을 입력해주세요" />
					</div>
					<div class="form-group">
						<label for="inquiry-phone">연락처 *</label>
						<input id="inquiry-phone" type="tel" placeholder="연락처를 입력해주세요" />
					</div>
					<div class="form-group">
						<label for="inquiry-email">이메일</label>
						<input id="inquiry-email" type="email" placeholder="이메일을 입력해주세요" />
					</div>
					<div class="form-group">
						<label for="inquiry-type">문의 유형</label>
						<select id="inquiry-type">
							<option value="">문의 유형을 선택해주세요</option>
							<option value="individual">개인 상담</option>
							<!-- <option value="corporate">기업/조직 상담</option> -->
							<option value="workshop">워크숍/캠프</option>
							<option value="other">기타</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inquiry-datetime">상담 희망 일시</label>
						<input id="inquiry-datetime" type="datetime-local" />
					</div>
					<div class="form-group">
						<label for="inquiry-content">문의 내용 *</label>
						<textarea id="inquiry-content" placeholder="문의하실 내용을 자세히 입력해주세요"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn-secondary" onclick={closeModals}>취소</button>
				<button class="btn-secondary" onclick={switchToDetailModal}>자세히 보기</button>
				<button class="btn-primary">상담 신청하기</button>
			</div>
		</div>
	</div>
{/if}

<!-- 자세히 보기 모달 -->
{#if showDetail && selectedService}
	<div class="modal-overlay" onclick={closeModals} onkeydown={(e) => e.key === 'Enter' && closeModals()} role="button" tabindex="0">
		<div class="modal-content detail-modal" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.key === 'Enter' && e.stopPropagation()} role="button" tabindex="-1">
			<div class="modal-header">
				<h3>{selectedService.name}</h3>
				<button class="modal-close" onclick={closeModals}>×</button>
			</div>
			<div class="modal-body">
				<div class="service-detail">
					<div class="service-overview">
						<div class="service-icon-large">{selectedService.icon}</div>
						<p class="service-description-large">{selectedService.description}</p>
					</div>
					
					{#if selectedService.details}
						<div class="service-details">
							<h4>서비스 개요</h4>
							<p class="overview-text">{selectedService.details.overview}</p>
							
							{#if selectedService.details.targets}
								<h4>대상별 서비스</h4>
								<div class="targets-list">
									{#each selectedService.details.targets as target}
										<div class="target-item">
											<div class="target-header">
												<h5>{target.name}</h5>
												<span class="target-service">{target.service}</span>
											</div>
											{#if target.content}
												<p class="target-content">{target.content}</p>
											{/if}
											{#if target.method}
												<div class="target-method">
													<strong>방법:</strong> {target.method}
												</div>
											{/if}
											{#if target.effects}
												<div class="target-effects">
													<strong>기대효과:</strong>
													<ul>
														{#each target.effects as effect}
															<li>{effect}</li>
														{/each}
													</ul>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn-secondary" onclick={closeModals}>닫기</button>
				<button class="btn-primary" onclick={switchToInquiryModal}>상담 문의하기</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.services-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.section-header {
		text-align: center;
		margin-bottom: 50px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 15px 0;
	}

	.section-header p {
		font-size: 1.1rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.type-filter {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		gap: 10px;
	}

	.type-button {
		padding: 12px 24px;
		border: 2px solid #007bff;
		background: #fff;
		color: #007bff;
		border-radius: 25px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.type-button.active {
		background: #007bff;
		color: #fff;
	}

	.type-button:hover:not(.active) {
		background: #007bff;
		color: #fff;
	}

	.category-filter {
		display: flex;
		justify-content: center;
		margin-bottom: 50px;
		gap: 15px;
		flex-wrap: wrap;
	}

	.category-button {
		padding: 8px 16px;
		border: 1px solid #ddd;
		background: #fff;
		color: #666;
		border-radius: 20px;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.category-button.active {
		background: #333;
		border-color: #333;
		color: #fff;
	}

	.category-button:hover:not(.active) {
		border-color: #333;
		color: #333;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
		margin-bottom: 60px;
	}

	.service-card {
		background: #fff;
		border-radius: 16px;
		padding: 30px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		border: 1px solid #e9ecef;
	}

	.service-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	.service-icon {
		font-size: 3rem;
		margin-bottom: 20px;
		text-align: center;
	}

	.service-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
		text-align: center;
	}

	.service-description {
		color: #666;
		font-size: 14px;
		line-height: 1.6;
		margin: 0 0 20px 0;
		text-align: center;
	}

	.service-features {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 25px;
		justify-content: center;
	}

	.feature-tag {
		background: #e3f2fd;
		color: #1976d2;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
	}

	.service-actions {
		display: flex;
		gap: 10px;
	}

	.btn-inquiry,
	.btn-detail {
		flex: 1;
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-inquiry {
		background: #007bff;
		color: #fff;
	}

	.btn-inquiry:hover {
		background: #0056b3;
	}

	.btn-detail {
		background: #f8f9fa;
		color: #333;
		border: 1px solid #ddd;
	}

	.btn-detail:hover {
		background: #e9ecef;
	}

	.cta-section {
		background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
		border-radius: 16px;
		padding: 50px 40px;
		text-align: center;
		color: #fff;
	}

	.cta-content h3 {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0 0 15px 0;
	}

	.cta-content p {
		font-size: 1.1rem;
		margin: 0 0 30px 0;
		opacity: 0.9;
	}

	.cta-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
	}

	.btn-primary,
	.btn-secondary {
		padding: 12px 24px;
		border: none;
		border-radius: 6px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: #fff;
		color: #007bff;
	}

	.btn-primary:hover {
		background: #f8f9fa;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: #fff;
		border: 2px solid #fff;
	}

	.btn-secondary:hover {
		background: #fff;
		color: #007bff;
		transform: translateY(-2px);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.services-section {
			padding: 60px 0;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.type-filter {
			flex-direction: column;
			align-items: center;
		}

		.type-button {
			width: 100%;
			max-width: 300px;
		}

		.category-filter {
			justify-content: center;
		}

		.services-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.container {
			padding: 0 15px;
		}

		.cta-section {
			padding: 40px 20px;
		}

		.cta-content h3 {
			font-size: 1.5rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			max-width: 250px;
		}
	}

	@media (max-width: 480px) {
		.section-header h2 {
			font-size: 1.8rem;
		}

		.service-card {
			padding: 20px;
		}

		.service-name {
			font-size: 1.2rem;
		}

		.service-actions {
			flex-direction: column;
		}

		.cta-content h3 {
			font-size: 1.3rem;
		}

		.cta-content p {
			font-size: 1rem;
		}
	}

	/* 모달 스타일 */
	.modal-overlay {
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
	}

	.modal-content {
		background: #fff;
		border-radius: 12px;
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.detail-modal {
		max-width: 800px;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 30px;
		border-bottom: 1px solid #e9ecef;
		flex-shrink: 0;
		background: #fff;
		border-radius: 12px 12px 0 0;
	}

	.modal-header h3 {
		margin: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 2rem;
		color: #999;
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.modal-close:hover {
		background: #f8f9fa;
		color: #333;
	}

	.modal-body {
		padding: 30px;
		overflow-y: auto;
		flex: 1;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 5px;
		padding: 5px 5px;
		border-top: 1px solid #e9ecef;
		flex-shrink: 0;
		background: #fff;
		border-radius: 0 0 12px 12px;
	}

	.modal-footer .btn-primary,
	.modal-footer .btn-secondary {
		padding: 5px 5px;
		border: none;
		border-radius: 6px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.modal-footer .btn-primary {
		background: #007bff;
		color: #fff;
	}

	.modal-footer .btn-primary:hover {
		background: #0056b3;
		transform: translateY(-2px);
	}

	.modal-footer .btn-secondary {
		background: #f8f9fa;
		color: #333;
		border: 2px solid #e9ecef;
	}

	.modal-footer .btn-secondary:hover {
		background: #e9ecef;
		border-color: #dee2e6;
		transform: translateY(-2px);
	}

	/* 상담 문의 폼 스타일 */
	.inquiry-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.form-group label {
		font-weight: 600;
		color: #333;
		font-size: 14px;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 8px 8px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 14px;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #007bff;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 100px;
	}

	/* 서비스 상세 정보 스타일 */
	.service-detail {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.service-overview {
		text-align: center;
		padding: 30px;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.service-icon-large {
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.service-description-large {
		font-size: 1.1rem;
		color: #666;
		line-height: 1.6;
		margin: 0;
	}

	.service-details h4 {
		color: #333;
		font-size: 1.3rem;
		margin: 0 0 15px 0;
		border-bottom: 2px solid #007bff;
		padding-bottom: 10px;
	}

	.overview-text {
		font-size: 1rem;
		line-height: 1.6;
		color: #555;
		margin: 0 0 25px 0;
	}

	.targets-list {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.target-item {
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 25px;
		background: #fff;
	}

	.target-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.target-header h5 {
		margin: 0;
		font-size: 1.2rem;
		color: #333;
	}

	.target-service {
		background: #007bff;
		color: #fff;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 500;
	}

	.target-content {
		color: #666;
		line-height: 1.6;
		margin: 0 0 15px 0;
	}

	.target-method,
	.target-effects {
		margin-bottom: 15px;
	}

	.target-method strong,
	.target-effects strong {
		color: #333;
		font-weight: 600;
	}

	.target-effects ul {
		margin: 10px 0 0 20px;
		padding: 0;
	}

	.target-effects li {
		margin-bottom: 8px;
		color: #666;
		line-height: 1.5;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		.modal-content {
			margin: 10px;
			max-height: 95vh;
		}

		.modal-header,
		.modal-footer {
			padding: 20px;
		}

		.modal-body {
			padding: 20px;
		}

		.modal-header h3 {
			font-size: 1.3rem;
		}

		.service-icon-large {
			font-size: 3rem;
		}

		.target-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.modal-footer button {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.modal-overlay {
			padding: 10px;
		}

		.modal-header,
		.modal-footer {
			padding: 15px;
		}

		.modal-body {
			padding: 15px;
		}

		.service-overview {
			padding: 20px;
		}

		.target-item {
			padding: 20px;
		}
	}
</style>
