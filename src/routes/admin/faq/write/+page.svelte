<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { goto } from '$app/navigation';

	let form = $state({
		category: '전체',
		question: '',
		answer: '',
		display_order: 0,
		is_active: 1
	});

	let submitting = $state(false);

	function validate() {
		if (!form.category.trim()) return alert('카테고리를 입력하세요.'), false;
		if (!form.question.trim()) return alert('질문을 입력하세요.'), false;
		if (!form.answer.trim()) return alert('답변을 입력하세요.'), false;
		return true;
	}

	async function submitFaq(e) {
		e.preventDefault();
		if (!validate()) return;
		submitting = true;
		try {
			const payload = { ...$state.snapshot(form) };
			const r = await ___prj.api.post('/s/system', 'new.faq', null, payload);
			if (r.data.result === ___const.OK) {
				alert('FAQ가 등록되었습니다.');
				goto('/faq');
			}
		} catch (err) {
			console.error('FAQ 등록 오류', err);
			alert('등록 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}
</script>

<Header />

<main class="faq-write-page">
	<section class="section">
		<div class="container">
			<h1>FAQ 작성</h1>
			<form onsubmit={submitFaq} class="faq-form">
				<div class="form-group">
					<label for="category">카테고리</label>
					<input id="category" type="text" bind:value={form.category} placeholder="예) PTI:CODE 검사" />
				</div>

				<div class="form-group">
					<label for="question">질문</label>
					<input id="question" type="text" bind:value={form.question} placeholder="질문을 입력하세요" />
				</div>

				<div class="form-group">
					<label for="answer">답변</label>
					<textarea id="answer" rows="6" bind:value={form.answer} placeholder="답변을 입력하세요"></textarea>
				</div>

				<div class="form-row">
					<div class="form-group small">
						<label for="display_order">노출 순서</label>
						<input id="display_order" type="number" bind:value={form.display_order} />
					</div>
					<div class="form-group small">
						<label for="is_active">노출 여부</label>
						<select id="is_active" bind:value={form.is_active}>
							<option value={1}>노출</option>
							<option value={0}>숨김</option>
						</select>
					</div>
				</div>

				<div class="actions">
					<button type="button" class="btn-secondary" onclick={() => goto('/faq')} disabled={submitting}>취소</button>
					<button type="submit" class="btn-primary" disabled={submitting}>{submitting ? '저장 중...' : '저장'}</button>
				</div>
			</form>
		</div>
	</section>
</main>

<Footer />

<style>
	.faq-write-page { margin-top: 80px; }
	.section { padding: 30px 0; }
	.container { max-width: 900px; margin: 0 auto; padding: 0 20px; }

	h1 { font-size: 1.8rem; margin: 0 0 20px 0; }

	.faq-form { display: flex; flex-direction: column; gap: 16px; }
	.form-group { display: flex; flex-direction: column; gap: 8px; }
	.form-row { display: flex; gap: 12px; }
	.form-group.small { flex: 1; }

	input[type="text"], input[type="number"], select, textarea {
		width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: border-color .2s ease;
	}
	input:focus, select:focus, textarea:focus { outline: none; border-color: #28a745; box-shadow: 0 0 0 3px rgba(40,167,69,.1); }

	.actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
	.btn-primary, .btn-secondary { padding: 10px 18px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; }
	.btn-primary { background: #28a745; color: #fff; }
	.btn-primary:hover { background: #20c997; }
	.btn-secondary { background: #6c757d; color: #fff; }
	.btn-secondary:hover { background: #5a6268; }
</style>

