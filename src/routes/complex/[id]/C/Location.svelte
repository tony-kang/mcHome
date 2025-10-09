<script>
	let { complexData } = $props();

	const transportation = [
		{ icon: '🚇', category: '지하철', items: [
			'신분당선 수지구청역 도보 5분',
			'신분당선 죽전역 차량 7분',
			'분당선 죽전역 차량 10분'
		]},
		{ icon: '🚌', category: '버스', items: [
			'마을버스 정류장 도보 3분',
			'광역버스 정류장 도보 5분',
			'시내버스 10개 노선'
		]},
		{ icon: '🚗', category: '도로', items: [
			'경부고속도로 진입 5분',
			'영동고속도로 진입 10분',
			'용인-서울고속도로 진입 3분'
		]}
	];

	const convenience = [
		{ icon: '🏫', category: '교육', items: [
			'동백초등학교 도보 10분',
			'서원초등학교 도보 12분',
			'동백중학교 도보 15분',
			'수지고등학교 차량 7분'
		]},
		{ icon: '🛒', category: '쇼핑', items: [
			'롯데마트 차량 5분',
			'홈플러스 차량 7분',
			'신세계백화점 차량 10분',
			'스타필드 하남 차량 25분'
		]},
		{ icon: '🏥', category: '의료', items: [
			'분당서울대병원 차량 15분',
			'강남세브란스병원 차량 20분',
			'용인세브란스병원 차량 10분'
		]},
		{ icon: '🌳', category: '공원', items: [
			'동백호수공원 도보 10분',
			'죽전근린공원 차량 5분',
			'수지중앙공원 차량 8분'
		]}
	];
</script>

<section class="c-section location-section">
	<div class="c-container">
		<h2 class="c-section-title">위치 안내</h2>
		<p class="c-section-subtitle">
			완벽한 교통과 편리한 생활 인프라
		</p>

		<!-- 주소 정보 -->
		<div class="address-box">
			<div class="address-icon">
				<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
					<path d="M24 4C16.268 4 10 10.268 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.268 31.732 4 24 4Z" stroke="currentColor" stroke-width="3" fill="none"/>
					<circle cx="24" cy="18" r="6" stroke="currentColor" stroke-width="3" fill="none"/>
				</svg>
			</div>
			<div class="address-content">
				<h3>소재지</h3>
				<p class="address-text">{complexData?.address || '경기도 용인시 기흥구 진산로 124'}</p>
			</div>
		</div>

		<!-- 지도 영역 -->
		<div class="map-container">
			<div class="map-placeholder">
				<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
					<path d="M40 10C28.954 10 20 18.954 20 30C20 45 40 70 40 70C40 70 60 45 60 30C60 18.954 51.046 10 40 10Z" stroke="currentColor" stroke-width="4" fill="none"/>
					<circle cx="40" cy="30" r="8" stroke="currentColor" stroke-width="4" fill="none"/>
				</svg>
				<p>지도 API 연동 영역</p>
				<button class="c-btn c-btn-primary">네이버 지도로 보기</button>
			</div>
		</div>

		<!-- 교통 정보 -->
		<div class="info-section">
			<h3 class="info-title">
				<span class="icon">🚊</span>
				교통 안내
			</h3>
			<div class="info-grid">
				{#each transportation as trans}
					<div class="info-card">
						<div class="info-icon">{trans.icon}</div>
						<h4>{trans.category}</h4>
						<ul>
							{#each trans.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- 생활 편의시설 -->
		<div class="info-section">
			<h3 class="info-title">
				<span class="icon">🏢</span>
				생활 편의시설
			</h3>
			<div class="info-grid">
				{#each convenience as conv}
					<div class="info-card">
						<div class="info-icon">{conv.icon}</div>
						<h4>{conv.category}</h4>
						<ul>
							{#each conv.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- 오시는 길 안내 -->
		<div class="directions-box">
			<h3>오시는 길</h3>
			<div class="directions-grid">
				<div class="direction-item">
					<div class="direction-icon">🚗</div>
					<h4>자가용</h4>
					<p>
						네비게이션에 "{complexData?.address || '서울특별시 강서구 공항대로 302'}" 검색<br/>
						또는 "{complexData?.name || '센터스퀘어 발산 하이브 엘'}" 검색
					</p>
				</div>
				<div class="direction-item">
					<div class="direction-icon">🚇</div>
					<h4>대중교통</h4>
					<p>
						신분당선 수지구청역 1번 출구<br/>
						도보 5분
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.location-section {
		background: var(--bg-light);
	}

	.address-box {
		display: flex;
		align-items: center;
		gap: 30px;
		padding: 40px;
		background: white;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		margin-bottom: 40px;
	}

	.address-icon {
		color: var(--primary-color);
		flex-shrink: 0;
	}

	.address-content h3 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 10px 0;
	}

	.address-text {
		font-size: 1.1rem;
		color: var(--text-gray);
		margin: 0;
		line-height: 1.6;
	}

	.map-container {
		margin-bottom: 60px;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.map-placeholder {
		background: white;
		min-height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		color: var(--text-gray);
	}

	.map-placeholder svg {
		color: var(--border-color);
	}

	.info-section {
		margin-bottom: 60px;
	}

	.info-title {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 30px 0;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.info-title .icon {
		font-size: 2rem;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 25px;
	}

	.info-card {
		background: white;
		padding: 30px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		transition: all 0.3s ease;
	}

	.info-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-md);
	}

	.info-icon {
		font-size: 2.5rem;
		margin-bottom: 15px;
	}

	.info-card h4 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
		padding-bottom: 15px;
		border-bottom: 2px solid var(--border-color);
	}

	.info-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.info-card li {
		padding: 8px 0;
		padding-left: 20px;
		color: var(--text-gray);
		position: relative;
		line-height: 1.6;
	}

	.info-card li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary-color);
		font-weight: 700;
	}

	.directions-box {
		background: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.directions-box h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 30px 0;
		text-align: center;
	}

	.directions-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 40px;
	}

	.direction-item {
		text-align: center;
	}

	.direction-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.direction-item h4 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.direction-item p {
		font-size: 1rem;
		color: var(--text-gray);
		line-height: 1.8;
		margin: 0;
	}

	/* 반응형 */
	@media (max-width: 768px) {
		.address-box {
			flex-direction: column;
			padding: 30px 20px;
			text-align: center;
		}

		.map-placeholder {
			min-height: 400px;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.directions-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}
	}

	@media (max-width: 480px) {
		.address-box {
			padding: 25px 20px;
		}

		.address-icon svg {
			width: 36px;
			height: 36px;
		}

		.address-content h3 {
			font-size: 1.1rem;
		}

		.address-text {
			font-size: 1rem;
		}

		.map-placeholder {
			min-height: 300px;
			padding: 20px;
		}

		.map-placeholder svg {
			width: 60px;
			height: 60px;
		}

		.info-title {
			font-size: 1.5rem;
		}

		.info-card {
			padding: 25px 20px;
		}

		.directions-box {
			padding: 30px 20px;
		}
	}
</style>

