<script>
	let { complexData } = $props();
</script>

<footer class="complex-footer">
	<div class="footer-top">
		<div class="c-container-wide">
			<div class="footer-content">
				<div class="footer-col">
					<h3 class="footer-title">{complexData?.name || '단지명'}</h3>
					<p class="footer-desc">
						{complexData?.slogan || '품격있는 삶의 시작'}
					</p>
				</div>
				<div class="footer-col">
					<h4 class="footer-subtitle">문의</h4>
					<ul class="footer-list">
						<li>
							<span class="label">분양문의</span>
							<span class="value">{complexData?.phone || '000-0000-0000'}</span>
						</li>
						<li>
							<span class="label">상담시간</span>
							<span class="value">평일 10:00 - 18:00</span>
						</li>
					</ul>
				</div>
				<div class="footer-col">
					<h4 class="footer-subtitle">위치</h4>
					<p class="footer-address">
						{complexData?.address || '경기도 용인시'}
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="footer-middle">
		<div class="c-container-wide">
		<div class="company-links">
			<!-- <a href="https://www.lottenc.com" target="_blank" rel="noopener noreferrer" class="company-link">롯데건설</a> -->
			<!-- <a href="https://www.lottecastle.com" target="_blank" rel="noopener noreferrer" class="company-link">센터스퀘어 발산</a> -->
			<a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer" class="company-link">국토교통부</a>
			<a href="https://www.reb.or.kr" target="_blank" rel="noopener noreferrer" class="company-link">한국부동산원</a>
		</div>
		</div>
	</div>

	<div class="footer-bottom">
		<div class="c-container-wide">
			<div class="company-info">
				<p class="company-name">
					<strong>{complexData?.constructor || '롯데건설(주)'}</strong>
				</p>
				<div class="info-grid">
					<div class="info-item">
						<span class="info-label">시행사</span>
						<span class="info-value">{complexData?.developer || '더시너지1(주)'}</span>
					</div>
					<div class="info-item">
						<span class="info-label">시공사</span>
						<span class="info-value">{complexData?.constructor || '롯데건설(주)'}</span>
					</div>
					<div class="info-item">
						<span class="info-label">대표전화</span>
						<span class="info-value">{complexData?.phone || '000-0000-0000'}</span>
					</div>
					<div class="info-item">
						<span class="info-label">주소</span>
						<span class="info-value">{complexData?.address || '경기도 용인시'}</span>
					</div>
				</div>
				<p class="copyright">
					COPYRIGHT © LOTTE E&C. ALL RIGHTS RESERVED.
				</p>
			</div>

		<div class="legal-links">
			<a href="/terms" class="legal-link">이용약관</a>
			<a href="/privacy" class="legal-link privacy">개인정보처리방침</a>
			<a href="/location-terms" class="legal-link">위치정보이용약관</a>
		</div>

			<div class="disclaimer">
				<p>
					본 홈페이지는 광고·홍보물이며 법적 효력을 갖지 않습니다. 
					자세한 내용은 사업승인도서 및 분양계약서를 확인하시기 바랍니다.
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.complex-footer {
		background: var(--text-dark);
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
	}

	.footer-top {
		padding: 60px 0 40px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 60px;
	}

	.footer-col {
		min-width: 0;
	}

	.footer-title {
		font-size: 1.8rem;
		font-weight: 700;
		color: white;
		margin: 0 0 15px 0;
		letter-spacing: -0.5px;
	}

	.footer-desc {
		font-size: 1rem;
		line-height: 1.6;
		margin: 0;
		color: rgba(255, 255, 255, 0.7);
	}

	.footer-subtitle {
		font-size: 1.1rem;
		font-weight: 600;
		color: white;
		margin: 0 0 20px 0;
	}

	.footer-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-list li {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 15px;
	}

	.footer-list .label {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.footer-list .value {
		font-size: 1rem;
		font-weight: 600;
		color: white;
	}

	.footer-address {
		line-height: 1.8;
		margin: 0;
	}

	.footer-middle {
		padding: 30px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.company-links {
		display: flex;
		gap: 30px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.company-link {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.company-link:hover {
		color: white;
	}

	.footer-bottom {
		padding: 40px 0;
	}

	.company-info {
		margin-bottom: 30px;
	}

	.company-name {
		font-size: 1.1rem;
		margin: 0 0 20px 0;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
		margin-bottom: 20px;
	}

	.info-item {
		display: flex;
		gap: 10px;
	}

	.info-label {
		color: rgba(255, 255, 255, 0.6);
		min-width: 80px;
	}

	.info-value {
		color: rgba(255, 255, 255, 0.9);
	}

	.copyright {
		margin: 20px 0 0 0;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.legal-links {
		display: flex;
		gap: 20px;
		margin-bottom: 30px;
		flex-wrap: wrap;
	}

	.legal-link {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}

	.legal-link:hover {
		color: white;
	}

	.legal-link.privacy {
		color: var(--secondary-color);
		font-weight: 600;
	}

	.disclaimer {
		padding-top: 30px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.disclaimer p {
		font-size: 0.85rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.footer-top {
			padding: 40px 0 30px;
		}

		.footer-title {
			font-size: 1.5rem;
		}

		.company-links {
			gap: 20px;
		}

		.footer-bottom {
			padding: 30px 0;
		}
	}

	@media (max-width: 480px) {
		.footer-content {
			gap: 30px;
		}

		.footer-title {
			font-size: 1.3rem;
		}

		.company-links {
			gap: 15px;
			font-size: 0.85rem;
		}

		.legal-links {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>

