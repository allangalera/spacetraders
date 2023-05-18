<script lang="ts">
	import { toastStore, modalStore, ProgressRadial, clipboard } from '@skeletonlabs/skeleton';
	import IoMdCopy from 'svelte-icons/io/IoMdCopy.svelte';
	import TokenMask from '$lib/components/TokenMask.svelte';
	import type { Agent } from '$lib/spacetraders/types/agents';
	import { setSelectedAgent, apiStore } from '$lib/stores/agent';
	import type { SelectedAgent } from '$lib/stores/agent';
	import type { Ship } from '$lib/spacetraders/types/ships.js';
	import type { InferModel } from 'drizzle-orm';
	import type { saves } from '$lib/db/schema';
	import IoMdArrowDropdown from 'svelte-icons/io/IoMdArrowDropdown.svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import ky from 'ky';

	export let data;

	let agentDetails: Agent | null;
	let ships: Ship[] | null;
	let savedGames: (InferModel<typeof saves, 'select'> & { isLoading?: boolean })[];

	const selectAgent = (selectedAgent: SelectedAgent) => {
		setSelectedAgent(selectedAgent);
	};

	apiStore.subscribe(async (api) => {
		if (!api) {
			agentDetails = null;
			ships = null;
			return;
		}

		const listShips = await api.fleet.listShips();

		ships = listShips.data;
	});

	$: savedGames = data.savedGames;
</script>

<div class="h-full flex flex-col items-center justify-centerw-full">
	<div class="flex flex-col max-w-2xl gap-4 w-full">
		{#if $apiStore}
			{#if ships}
				<h3>Ships</h3>
				<!-- <div class="table-container"> -->
				<table class="table table-hover">
					<thead>
						<tr>
							<th class="text-center">Ship</th>
							<th class="text-center">Waypoint</th>
							<th class="text-center">Crew</th>
							<th class="text-center">Fuel</th>
							<th class="text-center">Cargo</th>
							<th class="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each ships as ship}
							<tr>
								<td class="text-center">{ship.symbol}</td>
								<td class="text-center">{ship.nav.waypointSymbol}</td>
								<td class="text-center">{ship.crew.current}/{ship.crew.capacity}</td>
								<td class="text-center">{ship.fuel.current}/{ship.fuel.capacity}</td>
								<td class="text-center">{ship.cargo.units}/{ship.cargo.capacity}</td>
								<td>
									<div class="flex items-center justify-center">
										<button class="btn btn-sm variant-ringed">
											<div
												class="w-6 h-6"
												use:popup={{
													target: `ship-action-${ship.symbol}`,
													event: 'click',
													placement: 'bottom',
												}}
											>
												<IoMdArrowDropdown />
											</div>
											<div
												class="card bg-surface-50-900-token"
												data-popup={`ship-action-${ship.symbol}`}
											>
												<div class="flex flex-col gap-1">
													<button
														class="btn hover:variant-ghost-surface"
														on:click={() => console.log('get-waypoint')}
													>
														Get waypoint
													</button>
													<button
														class="btn hover:variant-ghost-surface"
														on:click={() => console.log('list-waypoints')}>List waypoints</button
													>
												</div>
												<div class="arrow bg-surface-50-900-token" />
											</div>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<!-- </div> -->
			{:else}
				<p>loading . . .</p>
			{/if}
		{:else}
			<h1 class="h1 text-center">Welcome AGSTUI</h1>
			<h2 class="h2 text-center mb-16">
				a <a class="anchor" href="https://spacetraders.io" target="_blank">Spacetraders</a> ui
			</h2>
			<div class="table-container">
				<table class="table table-hover">
					<thead>
						<tr>
							<th class="text-center">Symbol</th>
							<th class="text-center">Access Token</th>
							<th class="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#if data.savedGames && data.savedGames.length === 0}
							<tr>
								<td colspan="3">
									<p class="text-center">You have no games yet</p>
								</td>
							</tr>
						{:else if savedGames}
							{#each savedGames as save}
								<tr class="relative">
									<td class="text-center">{save.symbol}</td>
									<td class="text-center">
										<TokenMask token={save.access_token} />
									</td>
									<td class="text-end">
										<div class="flex items-center gap-4 justify-end">
											<button
												class="btn variant-ringed"
												use:clipboard={save.access_token}
												on:click={() => {
													toastStore.trigger({
														message: 'Access token copied successsfully.',
													});
												}}
											>
												<div class="w-6 h-6"><IoMdCopy class="w-10 h-10" /></div>
											</button>
											<button class="btn variant-ringed" on:click={() => selectAgent(save)}>
												select
											</button>
											<button
												class="btn variant-filled-error"
												on:click={() => {
													modalStore.trigger({
														type: 'confirm',
														title: 'Are you sure?',
														body: 'Are you sure you want to delete this agent?',
														response: async (r) => {
															if (!r) return;
															if (!apiStore) return;

															savedGames = savedGames.map((i) => {
																if (i.id === save.id) {
																	return {
																		...i,
																		isLoading: true,
																	};
																}
																return i;
															});
															try {
																const response = await ky.delete(`/api/agents/${save.id}`);

																console.log({ response });
																savedGames = savedGames.filter((i) => i.id !== save.id);
															} catch (error) {
																savedGames = savedGames.map((i) => {
																	if (i.id === save.id) {
																		return {
																			...i,
																			isLoading: false,
																		};
																	}
																	return i;
																});
															}
														},
													});
												}}
											>
												delete
											</button>

											{#if save.isLoading}
												<div
													class="text-center absolute w-full h-full flex justify-center items-center backdrop-blur-sm left-0"
												>
													<ProgressRadial width="w-10" height="h-10" />
												</div>
											{/if}
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
			<div class="flex gap-4 justify-end">
				<a class="btn variant-ringed-primary" href="/agents/import">import using access token</a>
				<a class="btn variant-ringed-primary" href="/agents/new">create a new game</a>
			</div>
		{/if}
	</div>
</div>
