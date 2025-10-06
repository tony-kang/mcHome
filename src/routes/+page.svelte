<script>
	import Header from '$lib/components/Header.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ServicesSection from '$lib/components/ServicesSection.svelte';
	import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>마인드코딩 - 교육을 넘어 경영, 마음으로</title>
	<meta name="description" content="마인드코딩은 개인의 심리재능(PTI:CODE)을 기반으로 학습·진로·관계·비즈니스 등 삶의 전 영역을 경영하는 맞춤형 성장 플랫폼입니다." />
</svelte:head>

<HeroSection />
<ServicesSection />
<!-- <TestimonialsSection /> -->
<Footer />
