<script lang="ts">
	import { apiStore } from '$lib/stores/agent';
	import type { Ship } from '$lib/spacetraders/types/ships.js';
	import type { InferModel } from 'drizzle-orm';
	import type { saves } from '$lib/db/schema';
	import ShipList from '$lib/components/ShipList.svelte';
	import AgentsPage from '$lib/components/AgentsPage.svelte';
	import Universe from '$lib/components/Universe.svelte';
	import System from '$lib/components/System.svelte';

	export let data;

	let ships: Ship[] | null;
	let savedGames: (InferModel<typeof saves, 'select'> & { isLoading?: boolean })[];

	apiStore.subscribe(async (api) => {
		if (!api) {
			ships = null;
			return;
		}

		const listShips = await api.fleet.listShips();

		ships = listShips.data;
	});

	$: savedGames = data.savedGames;
</script>

<Universe />

{#if $apiStore}
	<System />
{/if}
<div class="h-full flex flex-col items-center justify-centerw-full">
	<div class="flex flex-col max-w-2xl gap-4 w-full">
		{#if $apiStore}
			<!-- <ShipList {ships} /> -->
		{:else}
			<AgentsPage {savedGames} />
		{/if}
	</div>
</div>
