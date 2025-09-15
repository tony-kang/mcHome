import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// Node.js 모듈을 브라우저에서 외부화
	define: {
		global: 'globalThis',
	},
	
	optimizeDeps: {
		exclude: ['stream', 'util']
	},

	// 프로젝트에서 빌드 결과물의 출력 디렉토리를 변경
	build: {
		outDir: 'build',	// 기본값은 'dist'
		emptyOutDir: true, 	// 빌드 전 디렉토리 비우기

		//(!) Some chunks are larger than 500 kB after minification. ... 애러 방지
		chunkSizeWarningLimit: 1500, // 경고 표시 기준을 500KB에서 1.5 MB로 상향
		
		// Node.js 모듈을 외부화
		rollupOptions: {
			external: ['stream', 'util'],
			output: {
				globals: {
					stream: 'stream',
					util: 'util'
				}
			}
		}
	},

	// 개발 서버 설정
	server: {
		// Chrome DevTools 요청 무시
		fs: {
			allow: ['..']
		}
	}
});
