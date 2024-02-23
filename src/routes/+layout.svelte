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

<div class="w-full h-full flex flex-col">
	<Header user={data.user} />
	<main class="flex-1"><slot /></main>
	<footer>
		<Footer />
	</footer>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.300);
	}
</style>
