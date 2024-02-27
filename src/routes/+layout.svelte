<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';
	import { agentStore } from '$lib/stores/agent';

	export let data: PageData;

	$: {
		if (!data.user) {
			agentStore.set(null);
		}
	}
</script>

<div class="w-full h-full flex flex-col text-slate-100">
	<Header user={data.user} />
	<main class="flex-1 p-4 overflow-auto"><slot /></main>
	<footer>
		<Footer />
	</footer>
</div>
