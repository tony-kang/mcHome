<script>
		const footerLinks = {
		services: [
			{ name: '워크샵', url: '/services/workshop' },
			{ name: '학습캠프', url: '/services/learning-camp' },
			{ name: '커리어캠프', url: '/services/career-camp' },
			{ name: 'PTI코드', url: '/services/pti-code' },
			{ name: '자격증', url: '/services/certification' }
		]
	};
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<!-- Company Info -->
			<div class="footer-section">
				<h4>마인드코딩</h4>
				<div class="company-info">
					<p>대표번호 : 1661-6876</p>
					<p>사업자번호 : 788-88-01558</p>
					<p>통신판매업신고 : 2022-광주동구-0289호</p>
					<p>출판사신고 : 2022-000015호</p>
					<p>서울특별시 강남구 선릉로92길 28 4층 4279호(이전 주소)</p>
					<p><a href="https://bizno.net/?area=&query=788-88-01558" class="business-link">사업자정보확인</a></p>
				</div>
			</div>

			<!-- Services Links -->
			<div class="footer-section">
				<h4>서비스</h4>
				<ul class="footer-links">
					{#each footerLinks.services as link}
						<li><a href={link.url}>{link.name}</a></li>
					{/each}
				</ul>
			</div>

			<!-- ISMS Certification -->
			<div class="footer-section">
				<div class="family-sites">
					<h4>Family Sites</h4>
					<div class="family-sites-info">
						<p><a href="https://app.mind-coding.com/" class="business-link">PTI 코드검사</a></p>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="footer-bottom">
			<p class="copyright">
				COPYRIGHT© 2024 MINCODING ALL RIGHTS RESERVED
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: #333;
		color: #fff;
		padding: 60px 0 20px;
	}


	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 40px;
		margin-bottom: 40px;
	}

	.footer-section a {
		color: #fff;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.footer-section a:hover {
		color: #ccc;
	}

	.footer-section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 20px 0;
		color: #fff;
	}

	.company-info p {
		margin: 0 0 8px 0;
		font-size: 14px;
		line-height: 1.5;
		color: #ccc;
	}

	.business-link {
		color: #007bff;
		text-decoration: none;
		font-size: 14px;
	}

	.business-link:hover {
		text-decoration: underline;
	}

	.footer-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 8px 0px;
	}

	.footer-links li {
		margin-bottom: 0;
	}

	.footer-links a {
		color: #ccc;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #007bff;
	}

	.isms-cert {
		background: rgba(255, 255, 255, 0.05);
		padding: 20px;
		border-radius: 8px;
	}

	.cert-info p {
		margin: 0 0 8px 0;
		font-size: 13px;
		line-height: 1.4;
		color: #ccc;
	}

	.cert-info strong {
		color: #fff;
	}

	.footer-bottom {
		border-top: 1px solid #555;
		padding-top: 20px;
		text-align: center;
	}

	.copyright {
		margin: 0;
		font-size: 12px;
		color: #999;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.footer {
			padding: 40px 0 20px;
		}

		.footer-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}


		.company-info p {
			font-size: 13px;
		}

		.footer-links a {
			font-size: 13px;
		}

		.cert-info p {
			font-size: 12px;
		}

		.copyright {
			font-size: 11px;
		}
	}

	@media (max-width: 480px) {
		.footer {
			padding: 30px 0 15px;
		}

		.footer-content {
			gap: 25px;
		}

		.isms-cert {
			padding: 15px;
		}

		.company-info p {
			font-size: 12px;
		}

		.footer-links a {
			font-size: 12px;
		}

		.cert-info p {
			font-size: 11px;
		}
	}
</style>



