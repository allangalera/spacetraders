<script lang="ts">
	import type { Trait } from '$lib/spacetraders/types/factions';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createTooltip({
		positioning: {
			placement: 'top',
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true,
		group: 'traits',
		disableHoverableContent: true,
	});

	export let trait: Trait;
</script>

<p class="border rounded px-1" use:melt={$trigger}>{trait.name}</p>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg bg-slate-50 shadow max-w-xl"
	>
		<div use:melt={$arrow} />
		<p class="px-4 py-1 text-slate-950 text-sm">{trait.description}</p>
	</div>
{/if}
