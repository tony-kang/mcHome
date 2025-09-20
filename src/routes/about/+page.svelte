<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>About - 마인드코딩 | 교육을 넘어 경영, 마음으로</title>
	<meta name="description" content="마인드코딩은 개인의 심리재능(PTI:CODE)을 기반으로 학습·진로·관계·비즈니스 등 삶의 전 영역을 경영하는 맞춤형 성장 플랫폼입니다." />
</svelte:head>

<Header />

<main class="about-page">
	<!-- Hero Section -->
	<section class="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat py-24" 
		style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/main/story_main.jpg');">
	</section>

	<!-- Story Section -->
	<section class="py-20 bg-gray-50">
		<div class="container max-w-7xl mx-auto px-5">
			<!-- About MINDCODING Section -->
			<div class="mb-20">
				<div class="flex justify-start items-center gap-4 mb-16">
					<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
					<h2 class="text-xl md:text-2xl font-bold text-gray-800">About 'MINDCODING'</h2>
					<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
				</div>

				<div class="flex flex-col lg:flex-row items-start gap-12">
					<!-- Left Column - Logo and Description -->
					<div class="w-full lg:w-1/2 flex flex-col justify-between h-full">
						<div class="flex flex-col items-center mb-8">
							<img src="/logo/mc_mindcoding_pattern_light.png" alt="마인드코딩" class="w-[200px] mb-6">
							<p class="text-lg text-center" style="color:#c3a316;">
								마인드코딩은 단순한 교육회사가 아닙니다.
							</p>
						</div>
						
						<div>
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 왜 마인드코딩인가?</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								모든 사람은 마음속에 고유한 코드(Code)를 품고 태어납니다.<br>
								이 코드는 기질·기능·재능을 통해 드러나며, 평생 성장의 길을 결정합니다.<br>
								마인드코딩은 그 숨겨진 코드를 해석하여, 개인의 생애주기에 맞는 성장 로드맵을 설계하고 실현합니다.
							</p>
						</div>
					</div>

					<!-- Right Column - Content -->
					<div class="w-full lg:w-1/2 space-y-6">
						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 교육을 넘어 경영, 마음으로???</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								우리는 개인이 타고난 심리재능(PTI:CODE)을 기반으로,<br>
								학습·진로·관계·비즈니스 등 삶의 전 영역을 경영하듯 설계하고 관리하는 맞춤형 성장 플랫폼입니다.
							</p>
						</div>

						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 우리가 하는 일</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								마인드코딩의 시작은 PTI:CODE 검사입니다.<br>
								모든 사람은 마음속에 자신만의 코드(CODE)를 품고 태어나며, 이 코드를 해석하는 순간부터 성장의 방향이 분명해집니다.<br>
								PTI:CODE 검사는 심리기질과 심리기능 그리고 심리재능을 정밀하게 진단하여, 개인이 어떤 방식으로 배우고, 어떤 관계 속에서 힘을 발휘하며, 어떤 환경에서 성과를 내는지를 보여줍니다.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- About PTI:CODE Section -->
			<div class="mb-20">
				<div class="flex justify-start items-center gap-4 mb-4">
					<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
					<h2 class="text-xl md:text-2xl font-bold text-gray-800">About 'PTI:CODE'</h2>
					<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
				</div>

				<div class="flex flex-col lg:flex-row items-start gap-12 min-h-[600px]">
					<!-- Left Column - Logo and Description -->
					<div class="w-full lg:w-1/2 flex flex-col justify-between h-full">
						<div class="flex flex-col items-center mb-8">
							<img src="/main/code_bi.png" alt="PTI:CODE" class="w-[200px] mb-6">
							<p class="text-lg text-center" style="color:#c3a316;">
								검사를 통해 드러난 결과는 곧 네 가지 영역으로 이어집니다.
							</p>
						</div>
						
						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 첫째, 심리(마음의 영역)입니다.</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								사람은 누구나 흔들릴 때가 있습니다.<br>
								마인드코딩은 심리재능 코칭과 멘탈 매니지먼트를 통해 스스로의 마음을 이해하고 회복할 수 있도록 돕습니다.<br>
								단순한 상담이 아니라, 타고난 심리재능을 기반으로 한 자기이해와 자기성장의 여정을 함께합니다.
							</p>
						</div>
					</div>

					<!-- Right Column - Content -->
					<div class="w-full lg:w-1/2 space-y-6">
						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 둘째, 학습(배움과 진로의 영역)입니다.</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								학생에게는 자신에게 맞는 학습 전략을 찾는 것이, 성인에게는 진로와 경력의 길을 설계하는 것이 핵심 과제입니다.<br>
								마인드코딩은 학습 성향을 분석하고, 진로와 계열을 제시하며, 입시와 관련한 컨설팅을 통해 생애주기에 맞는 학습 로드맵을 제공합니다.
							</p>
						</div>

						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 셋째, 관계(소통의 영역)입니다.</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								가정에서는 부모와 자녀가 더 잘 이해하고 소통할 수 있도록, 학교와 조직에서는 협력과 리더십이 살아나도록 돕습니다.<br>
								관계는 심리재능이 발휘되는 무대이기에, 마인드코딩은 심리재능을 바탕으로 관계를 경영하는 새로운 방식을 제안합니다.
							</p>
						</div>

						<div class="">
							<h3 class="text-xl font-bold mb-3" style="color:#c3a316;">* 넷째, 비즈니스(성과의 영역)입니다.</h3>
							<p class="text-gray-600 leading-relaxed text-sm">
								개인의 커리어 관리에서부터 기업의 성과와 조직문화 혁신까지, 마인드코딩은 심리재능경영의 관점으로 접근합니다.<br>
								직장인에게는 커리어 매니지먼트를, 기업에게는 성과·조직·리더십 솔루션을 제공하여, 변화하는 시대에 맞는 성장 전략을 실현합니다.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container max-w-7xl mx-auto px-5">
			
			<div class="mb-20">
				<div class="flex flex-col lg:flex-row items-start gap-12 min-h-[500px]">
					<!-- Left Column - Image and Content -->
					<div class="w-full lg:w-1/2 flex flex-col justify-between h-full">
						<!-- MISSION Section -->
						<div class="flex justify-start items-center gap-4 mb-4">
							<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
							<h2 class="text-xl md:text-2xl font-bold text-gray-800">MISSION</h2>
							<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
						</div>
						<div class="mb-8">
							<img src="/main/story_sub_1.jpg" alt="MISSION">
						</div>
						<h3 class="text-lg font-bold mb-3" style="color:#c3a316;">
							"우리는 사람의 심리재능을 선물로 여기고, 그 가능성을 현실 속에서 성장시켜 시대와 공동체에 기여하는 인재를 양성한다."
						</h3>
					</div>
					<div class="w-full lg:w-1/2 space-y-6">
						<!-- VISION Section -->
						<div class="flex justify-start items-center gap-4 mb-4">
							<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
							<h2 class="text-xl md:text-2xl font-bold text-gray-800">VISION</h2>
							<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
						</div>
						<div class="mb-8">
							<img src="/main/story_sub_2.jpg" alt="VISION">
						</div>
						<h3 class="text-lg font-bold mb-3" style="color:#c3a316;">
							"심리재능은 시대의 언어다. 우리는 그 언어를 통해 개인의 가능성을 키우고, 함께 성장하는 미래를 만든다."
						</h3>
					</div>
				</div>
			</div>

			


			<!-- Core Values Section -->
			<div class="mb-20">
				<div class="flex flex-col lg:flex-row items-start gap-12 min-h-[600px]">
					<!-- Left Column - Image and Content -->
					<div class="w-full lg:w-1/2 flex flex-col justify-between h-full">
						<div class="flex justify-start items-center gap-4 mb-4">
							<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
							<h2 class="text-xl md:text-2xl font-bold text-gray-800">Core Values – RE:GIP</h2>
							<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
						</div>
						<div class="flex flex-col items-center mb-8">
							<img src="/main/story_sub_3.jpg" alt="Core Values">
						</div>
						
						<h3 class="text-lg font-bold mb-3" style="color:#c3a316;">
							마인드코딩은 RE:GIP(Responsibility, Empathy, Growth, Innovation, Practicality)라는 
							다섯 가지 핵심 가치를 바탕으로, 책임 있는 성장 관리, 시대에 맞는 혁신, 그리고 현실성 있는 
							솔루션을 통해 개인과 조직, 나아가 사회 전체가 함께 번영할 수 있는 길을 만들어가고 있습니다.
						</h3>
					</div>

					<!-- Right Column - Content -->
					<div class="w-full lg:w-1/2 pt-12">
						<div class="values-grid">
							<div class="value-card">
								<div class="flex items-center justify-start">
									<span class="mr-2 text-[13px]">🎯</span>
									<span class="mr-2 text-[20px] font-bold text-[#c3a316]">Responsibility</span>
									<span class="text-[13px] font-bold text-[#c3a316]">| 책임</span>
								</div>
								<p>심리재능은 맡겨진 자산, 우리는 그것을 책임 있게 관리한다.</p>
							</div>
							<div class="value-card">
								<div class="flex items-center justify-start">
									<span class="mr-2 text-[13px]">💝</span>
									<span class="mr-2 text-[20px] font-bold text-[#c3a316]">Empathy</span>
									<span class="text-[13px] font-bold text-[#c3a316]">| 공감</span>
								</div>
								<p>사람을 수단이 아닌 고유한 가치로 존중한다.</p>
							</div>
							<div class="value-card">
								<div class="flex items-center justify-start">
									<span class="mr-2 text-[13px]">🌱</span>
									<span class="mr-2 text-[20px] font-bold text-[#c3a316]">Growth</span>
									<span class="text-[13px] font-bold text-[#c3a316]">| 성장</span>
								</div>
								<p>개인의 성장은 곧 조직과 사회의 성장을 이끈다.</p>
							</div>
							<div class="value-card">
								<div class="flex items-center justify-start">
									<span class="mr-2 text-[13px]">🚀</span>
									<span class="mr-2 text-[20px] font-bold text-[#c3a316]">Innovation</span>
									<span class="text-[13px] font-bold text-[#c3a316]">| 혁신</span>
								</div>
								<p>시대 변화에 맞춰 재능을 새롭게 경영한다.</p>
							</div>
							<div class="value-card">
								<div class="flex items-center justify-start">
									<span class="mr-2 text-[13px]">⚡</span>
									<span class="mr-2 text-[20px] font-bold text-[#c3a316]">Practicality</span>
									<span class="text-[13px] font-bold text-[#c3a316]">| 현실성</span>
								</div>
								<p>공허한 이상이 아닌, 실질적으로 작동하는 해법을 제시한다.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- GREETINGS Section -->
		<div class="container max-w-7xl mx-auto px-5">
			<div class="mb-20">
				<div class="flex justify-start items-center gap-4 mb-4">
					<img src="/main/mc_arrow.png" alt="마인드코딩" class="w-[30px]">
					<h2 class="text-xl md:text-2xl font-bold text-gray-800">GREETINGS</h2>
					<img src="/main/mc_bar.png" alt="마인드코딩" class="w-[60px]">
				</div>

				<div class="flex flex-col lg:flex-row items-start gap-12 min-h-[600px]">
					<!-- Left Column - Image and Content -->
					<div class="w-full lg:w-1/2 flex flex-col justify-between h-full">
						<div class="flex flex-col items-center mb-8">
							<img src="/main/story_sub_4.jpg" alt="GREETINGS">
						</div>
						
						<div class="ceo-message">
							<p>
								안녕하세요. 마인드코딩 대표 박제희 입니다.<br><br>
								마인드코딩은 교육을 넘어, 경영의 관점에서 사람의 심리재능을 다루는 기업입니다. 
								우리는 개인이 타고난 심리재능(PTI:CODE)을 기반으로, 학습·진로·관계·비즈니스 등 
								삶의 전 영역에서 체계적이고 지속 가능한 성장 관리를 제공합니다.
							</p>
						</div>
					</div>

					<!-- Right Column - Content -->
					<div class="w-full lg:w-1/2">
						<div class="ceo-message">
							<p>
								우리의 사명은 분명합니다.<br>
								<strong>"사람의 심리재능을 선물로 여기고, 그 가능성을 현실 속에서 성장시켜 시대와 공동체에 기여하는 인재를 양성한다."</strong>
							</p>
							
							<p>
								이는 단순한 교육 서비스가 아니라, 미래를 준비하는 재능경영 솔루션을 제시하는 일입니다.
							</p>
							
							<p>
								마인드코딩은 RE:GIP(Responsibility, Empathy, Growth, Innovation, Practicality)라는 
								다섯 가지 핵심 가치를 바탕으로, 책임 있는 성장 관리, 시대에 맞는 혁신, 그리고 현실성 있는 
								솔루션을 통해 개인과 조직, 나아가 사회 전체가 함께 번영할 수 있는 길을 만들어가고 있습니다.
							</p>
							
							<p>
								앞으로도 우리는 심리재능을 시대의 언어로 해석하고, 그것을 개인의 성장과 사회의 번영으로 
								확장하는 비전을 향해 나아가겠습니다.
							</p>
							
							<p>
								마인드코딩은 단순한 교육회사가 아닌, 미래를 경영하는 파트너로서 여러분과 함께하겠습니다.
							</p>
							
							<p class="ceo-signature">감사합니다.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
</section>
</main>

<Footer />

<style>
	.about-page {
		margin-top: 70px; /* Header height */
	}


	.values-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}

	.value-card {
		background: #f8f9fa;
		border-radius: 12px;
		text-align: left;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.value-card p {
		font-size: 0.95rem;
		line-height: 1.6;
		color: #666;
		margin: 10px 0 0 30px;
	}

	.ceo-message p {
		line-height: 1.8;
		color: #555;
		margin: 0 0 25px 0;
	}

	.ceo-message strong {
		color: #007bff;
		font-weight: 600;
	}

	.ceo-signature {
		text-align: right;
		font-weight: 600;
		color: #333;
		font-size: 1.2rem;
		margin-top: 40px !important;
	}
</style>
