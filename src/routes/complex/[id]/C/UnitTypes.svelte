<script>
	let currentType = $state(0);
	
	const unitTypes = [
		{
			name: '84A',
			area: '84.94',
			exclusive: '59.98',
			common: '24.96',
			supply: '84.94',
			other: '24.56',
			contract: '109.50',
			rooms: '3',
			baths: '2',
			balcony: '있음',
			image: '/main/story_sub_1.jpg',
			features: ['남향 위주', '알파룸 구성', '드레스룸', '팬트리']
		},
		{
			name: '84B',
			area: '84.98',
			exclusive: '59.99',
			common: '24.99',
			supply: '84.98',
			other: '24.58',
			contract: '109.56',
			rooms: '3',
			baths: '2',
			balcony: '있음',
			image: '/main/story_sub_2.jpg',
			features: ['남동향 배치', '거실 확장형', '파우더룸', '수납공간']
		},
		{
			name: '84C',
			area: '84.94',
			exclusive: '59.98',
			common: '24.96',
			supply: '84.94',
			other: '24.56',
			contract: '109.50',
			rooms: '4',
			baths: '2',
			balcony: '있음',
			image: '/main/story_sub_3.jpg',
			features: ['4베이 구성', '넓은 거실', '주방 확장', '복도 팬트리']
		},
		{
			name: '84D',
			area: '84.93',
			exclusive: '59.97',
			common: '24.96',
			supply: '84.93',
			other: '24.56',
			contract: '109.49',
			rooms: '3',
			baths: '2',
			balcony: '있음',
			image: '/main/story_sub_4.jpg',
			features: ['남서향 위주', '침실 분리', '붙박이장', '대형 발코니']
		},
		{
			name: '84E',
			area: '84.96',
			exclusive: '59.98',
			common: '24.98',
			supply: '84.96',
			other: '24.57',
			contract: '109.53',
			rooms: '3',
			baths: '2',
			balcony: '있음',
			image: '/main/story_main.jpg',
			features: ['코너 위치', '통풍 우수', '채광 최상', '프리미엄 뷰']
		}
	];

	function prevType() {
		currentType = currentType > 0 ? currentType - 1 : unitTypes.length - 1;
	}

	function nextType() {
		currentType = currentType < unitTypes.length - 1 ? currentType + 1 : 0;
	}
</script>

<section class="c-section unit-types-section">
	<div class="c-container">
		<h2 class="c-section-title">평면 타입</h2>
		<p class="c-section-subtitle">
			84㎡ 단일평형의 다양한 타입을 확인하세요
		</p>

		<div class="unit-viewer">
			<!-- 타입 네비게이션 -->
			<div class="type-nav">
				{#each unitTypes as type, index}
					<button 
						class="type-btn {currentType === index ? 'active' : ''}" 
						onclick={() => currentType = index}>
						{type.name}
					</button>
				{/each}
			</div>

			<!-- 타입 상세 정보 -->
			<div class="type-detail">
				<div class="type-image">
					<img src={unitTypes[currentType].image} alt={unitTypes[currentType].name} />
					<div class="image-controls">
						<button class="control-btn" onclick={prevType} aria-label="이전">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						<button class="control-btn" onclick={nextType} aria-label="다음">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					</div>
				</div>

				<div class="type-info">
					<div class="type-header">
						<h3 class="type-name">{unitTypes[currentType].name}형</h3>
						<div class="type-badges">
							<span class="c-badge c-badge-primary">{unitTypes[currentType].rooms}룸</span>
							<span class="c-badge c-badge-gold">{unitTypes[currentType].baths}욕실</span>
						</div>
					</div>

					<!-- 면적 정보 -->
					<div class="area-table">
						<table>
							<thead>
								<tr>
									<th>구분</th>
									<th>면적(㎡)</th>
									<th>면적(평)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>전용면적</td>
									<td>{unitTypes[currentType].exclusive}</td>
									<td>{(parseFloat(unitTypes[currentType].exclusive) / 3.3058).toFixed(2)}</td>
								</tr>
								<tr>
									<td>주거공용면적</td>
									<td>{unitTypes[currentType].common}</td>
									<td>{(parseFloat(unitTypes[currentType].common) / 3.3058).toFixed(2)}</td>
								</tr>
								<tr>
									<td>공급면적</td>
									<td><strong>{unitTypes[currentType].supply}</strong></td>
									<td><strong>{(parseFloat(unitTypes[currentType].supply) / 3.3058).toFixed(2)}</strong></td>
								</tr>
								<tr>
									<td>기타공용면적</td>
									<td>{unitTypes[currentType].other}</td>
									<td>{(parseFloat(unitTypes[currentType].other) / 3.3058).toFixed(2)}</td>
								</tr>
								<tr class="highlight">
									<td><strong>계약면적</strong></td>
									<td><strong>{unitTypes[currentType].contract}</strong></td>
									<td><strong>{(parseFloat(unitTypes[currentType].contract) / 3.3058).toFixed(2)}</strong></td>
								</tr>
							</tbody>
						</table>
					</div>

					<!-- 특징 -->
					<div class="type-features">
						<h4>주요 특징</h4>
						<ul>
							{#each unitTypes[currentType].features as feature}
								<li>{feature}</li>
							{/each}
						</ul>
					</div>

					<div class="type-actions">
						<button class="c-btn c-btn-primary">평면도 다운로드</button>
						<button class="c-btn c-btn-secondary">상담 신청</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.unit-types-section {
		background: white;
	}

	.unit-viewer {
		background: var(--bg-light);
		border-radius: 8px;
		padding: 40px;
		box-shadow: var(--shadow-sm);
	}

	.type-nav {
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-bottom: 40px;
		flex-wrap: wrap;
	}

	.type-btn {
		padding: 12px 28px;
		background: white;
		border: 2px solid var(--border-color);
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-gray);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.type-btn:hover {
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.type-btn.active {
		background: var(--primary-color);
		border-color: var(--primary-color);
		color: white;
	}

	.type-detail {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.type-image {
		position: relative;
		aspect-ratio: 4/3;
		overflow: hidden;
	}

	.type-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-controls {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	}

	.control-btn {
		width: 48px;
		height: 48px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-sm);
	}

	.control-btn:hover {
		background: white;
		transform: scale(1.1);
	}

	.control-btn svg {
		color: var(--primary-color);
	}

	.type-info {
		padding: 40px;
	}

	.type-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.type-name {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0;
	}

	.type-badges {
		display: flex;
		gap: 10px;
	}

	.area-table {
		margin-bottom: 30px;
	}

	.area-table table {
		width: 100%;
		border-collapse: collapse;
	}

	.area-table th,
	.area-table td {
		padding: 12px 15px;
		text-align: left;
		border-bottom: 1px solid var(--border-color);
	}

	.area-table th {
		background: var(--bg-light);
		font-weight: 700;
		color: var(--text-dark);
		font-size: 0.9rem;
	}

	.area-table td {
		color: var(--text-gray);
	}

	.area-table tr.highlight {
		background: var(--bg-light);
	}

	.area-table tr.highlight td {
		color: var(--primary-color);
		font-weight: 700;
	}

	.type-features {
		margin-bottom: 30px;
		padding: 20px;
		background: var(--bg-light);
		border-radius: 4px;
	}

	.type-features h4 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.type-features ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	.type-features li {
		padding-left: 20px;
		position: relative;
		color: var(--text-gray);
	}

	.type-features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--primary-color);
		font-weight: 700;
	}

	.type-actions {
		display: flex;
		gap: 15px;
	}

	.type-actions button {
		flex: 1;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.type-detail {
			grid-template-columns: 1fr;
		}

		.type-info {
			padding: 30px;
		}
	}

	@media (max-width: 768px) {
		.unit-viewer {
			padding: 20px;
		}

		.type-nav {
			margin-bottom: 30px;
		}

		.type-btn {
			padding: 10px 20px;
			font-size: 0.9rem;
		}

		.type-info {
			padding: 20px;
		}

		.type-name {
			font-size: 1.6rem;
		}

		.type-features ul {
			grid-template-columns: 1fr;
		}

		.type-actions {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.unit-viewer {
			padding: 15px;
		}

		.type-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.area-table th,
		.area-table td {
			padding: 10px;
			font-size: 0.85rem;
		}
	}
</style>

