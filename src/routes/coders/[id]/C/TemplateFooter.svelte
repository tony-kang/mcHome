<script>
	let { counselorName = '상담사' } = $props();
</script>

<footer class="template-footer">
	<div class="t-container">
		<div class="footer-content">
			<div class="footer-info">
				<p>&copy; 2025 {counselorName}. All rights reserved.</p>
				<p class="footer-sub">Powered by MindCoding</p>
			</div>
			<div class="footer-links">
				<a href="/privacy" class="footer-link">개인정보처리방침</a>
				<span class="separator">|</span>
				<a href="/terms" class="footer-link">이용약관</a>
				<span class="separator">|</span>
				<a href="/contact" class="footer-link">문의하기</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.template-footer {
		background: #2d3748;
		color: white;
		padding: 40px 0;
		margin-top: 60px;
	}

	.t-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
	}

	.footer-info p {
		margin: 5px 0;
	}

	.footer-sub {
		opacity: 0.7;
		font-size: 0.9rem;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 15px;
		font-size: 0.9rem;
	}

	.footer-link {
		color: #cbd5e0;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-link:hover {
		color: white;
	}

	.separator {
		color: #4a5568;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			text-align: center;
		}

		.footer-links {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
