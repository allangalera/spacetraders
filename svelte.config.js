import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from 'svelte-kit-sst';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter(),
		alias: {
			$utils: 'src/utils',
			$services: 'src/services',
		},
	},
	vitePlugin: {
		inspector: true,
	},
};
export default config;
