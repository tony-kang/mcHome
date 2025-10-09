<script>
	let { complexData } = $props();
</script>

<section class="c-section project-info-section">
	<div class="c-container">
		<h2 class="c-section-title">프로젝트 개요</h2>
		<p class="c-section-subtitle">
			{complexData?.name || '단지명'}의 핵심 정보를 확인하세요
		</p>

		<div class="info-table-wrapper">
			<table class="info-table">
				<tbody>
					<tr>
						<th>단지명</th>
						<td>{complexData?.name || '센터스퀘어 발산 하이브 엘'}</td>
						<th>사업형태</th>
						<td>장기일반민간임대주택</td>
					</tr>
					<tr>
						<th>위치</th>
						<td colspan="3">{complexData?.address || '경기도 용인시 기흥구 보정동'}</td>
					</tr>
					<tr>
						<th>규모</th>
						<td>지하 3층 ~ 지상 36층</td>
						<th>세대수</th>
						<td>총 715세대</td>
					</tr>
					<tr>
						<th>시행사</th>
						<td>{complexData?.developer || '더시너지1(주)'}</td>
						<th>시행수탁사</th>
						<td>(주)하나자산신탁</td>
					</tr>
					<tr>
						<th>시공사</th>
						<td>{complexData?.constructor || '롯데건설(주)'}</td>
						<th>분양문의</th>
						<td>{complexData?.phone || '031-261-3448'}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 핵심 특징 -->
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<rect x="8" y="16" width="48" height="40" stroke="currentColor" stroke-width="3" fill="none"/>
						<line x1="32" y1="16" x2="32" y2="56" stroke="currentColor" stroke-width="3"/>
						<line x1="8" y1="36" x2="56" y2="36" stroke="currentColor" stroke-width="3"/>
					</svg>
				</div>
				<h3>최고층 36층</h3>
				<p>수지 최고층 랜드마크<br/>탁 트인 조망 확보</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="3" fill="none"/>
						<path d="M32 8 L32 32 L48 32" stroke="currentColor" stroke-width="3"/>
					</svg>
				</div>
				<h3>신분당선 수지구청역</h3>
				<p>역세권 프리미엄<br/>강남 접근성 최고</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<rect x="12" y="12" width="40" height="40" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
						<path d="M20 28 L28 36 L44 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<h3>84㎡ 단일평형</h3>
				<p>최적화된 설계<br/>완벽한 공간 구성</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<circle cx="32" cy="20" r="8" stroke="currentColor" stroke-width="3" fill="none"/>
						<circle cx="18" cy="40" r="6" stroke="currentColor" stroke-width="3" fill="none"/>
						<circle cx="46" cy="40" r="6" stroke="currentColor" stroke-width="3" fill="none"/>
						<line x1="32" y1="28" x2="32" y2="52" stroke="currentColor" stroke-width="3"/>
						<line x1="20" y1="34" x2="26" y2="28" stroke="currentColor" stroke-width="3"/>
						<line x1="44" y1="34" x2="38" y2="28" stroke="currentColor" stroke-width="3"/>
					</svg>
				</div>
				<h3>715세대 대단지</h3>
				<p>풍부한 커뮤니티<br/>안정적인 관리</p>
			</div>
		</div>

		<!-- 다운로드 섹션 -->
		<div class="download-section">
			<h3>자료 다운로드</h3>
			<div class="download-buttons">
				<button class="download-btn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor"/>
						<path d="M20 20H4V12H6V18H18V12H20V20Z" fill="currentColor"/>
					</svg>
					<span>동호수 배치도</span>
				</button>
				<button class="download-btn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor"/>
						<path d="M20 20H4V12H6V18H18V12H20V20Z" fill="currentColor"/>
					</svg>
					<span>E-카탈로그</span>
				</button>
				<button class="download-btn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor"/>
						<path d="M20 20H4V12H6V18H18V12H20V20Z" fill="currentColor"/>
					</svg>
					<span>위임장</span>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.project-info-section {
		background: var(--bg-light);
	}

	.info-table-wrapper {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		margin-bottom: 60px;
	}

	.info-table {
		width: 100%;
		border-collapse: collapse;
	}

	.info-table th,
	.info-table td {
		padding: 20px 30px;
		text-align: left;
		border-bottom: 1px solid var(--border-color);
	}

	.info-table tr:last-child th,
	.info-table tr:last-child td {
		border-bottom: none;
	}

	.info-table th {
		background: var(--bg-light);
		font-weight: 700;
		color: var(--text-dark);
		width: 15%;
		white-space: nowrap;
	}

	.info-table td {
		color: var(--text-gray);
		width: 35%;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;
		margin-bottom: 60px;
	}

	.feature-card {
		background: white;
		padding: 40px 30px;
		border-radius: 8px;
		text-align: center;
		box-shadow: var(--shadow-sm);
		transition: all 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-md);
	}

	.feature-icon {
		color: var(--primary-color);
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
	}

	.feature-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.feature-card p {
		font-size: 0.95rem;
		color: var(--text-gray);
		line-height: 1.6;
		margin: 0;
	}

	.download-section {
		background: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
		text-align: center;
	}

	.download-section h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 30px 0;
	}

	.download-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.download-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 32px;
		background: var(--primary-color);
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		background: var(--primary-dark);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.info-table th {
			width: 20%;
		}

		.info-table td {
			width: 30%;
		}
	}

	@media (max-width: 768px) {
		.info-table th,
		.info-table td {
			padding: 15px 20px;
			font-size: 0.9rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.feature-card {
			padding: 30px 20px;
		}

		.download-section {
			padding: 30px 20px;
		}

		.download-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.download-btn {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.info-table {
			font-size: 0.85rem;
		}

		.info-table th,
		.info-table td {
			padding: 12px 15px;
		}

		.info-table th {
			width: 30%;
		}

		.feature-icon svg {
			width: 48px;
			height: 48px;
		}

		.feature-card h3 {
			font-size: 1.1rem;
		}

		.feature-card p {
			font-size: 0.9rem;
		}
	}
</style>

