<script lang="ts">
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import IoMdCopy from 'svelte-icons/io/IoMdCopy.svelte';
	import { clipboard } from '@skeletonlabs/skeleton';
	import TokenMask from '$lib/components/TokenMask.svelte';
	import type { Agent } from '$lib/spacetraders/types/agents';
	import { setSelectedAgent, apiStore, agentStore } from '$lib/stores/agent';
	import type { SelectedAgent } from '$lib/stores/agent';
	import type { Ship } from '$lib/spacetraders/types/ships.js';
	import AgentDetails from '$lib/components/AgentDetails.svelte';
	export let data;

	const selectAgent = (selectedAgent: SelectedAgent) => {
		setSelectedAgent(selectedAgent);
	};

	let agentDetails: Agent;
	let ships: Ship[];

	agentStore.subscribe((v) => {
		console.log({ v });
	});

	apiStore.subscribe(async (api) => {
		console.log({ api });
		if (!api) return;

		const [getDetails, listShips] = await Promise.allSettled([
			api.agent.getDetails(),
			api.fleet.listShips(),
		]);

		if (getDetails.status === 'fulfilled') {
			agentDetails = getDetails.value.data;
		}

		if (listShips.status === 'fulfilled') {
			ships = listShips.value.data;
		}
	});
</script>

<div class="h-full flex flex-col items-center justify-centerw-full">
	<div class="flex flex-col max-w-2xl gap-4 w-full">
		<h1 class="text-center">Welcome AGSTUI</h1>
		<h2 class="text-center mb-16">
			a <a href="https://spacetraders.io" target="_blank">Spacetraders</a> ui
		</h2>
		{#if $apiStore}
			<h3>Agent Details</h3>
			{#if agentDetails}
				<AgentDetails {agentDetails} />
				<p>Account ID: {agentDetails.accountId}</p>
				<p>Credits: {agentDetails.credits}</p>
				<p>Headquarter: {agentDetails.headquarters}</p>
			{:else}
				<p>loading . . .</p>
			{/if}
			<h3>Ships</h3>
			{#if ships}
				{#each ships as ship}
					<p>Ship Symbol: {ship.symbol}</p>
				{/each}
			{:else}
				<p>loading . . .</p>
			{/if}
		{:else}
			<div class="table-container">
				<table class="table table-hover">
					<thead>
						<tr>
							<th class="text-center">Symbol</th>
							<th class="text-center">Access Token</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#if data.savedGames && data.savedGames.length === 0}
							<tr>
								<td colspan="3">
									<p class="text-center">You have no games yet</p>
								</td>
							</tr>
						{:else if data.savedGames}
							{#each data.savedGames as save}
								<tr>
									<td class="text-center">{save.symbol}</td>
									<td class="text-center">
										<TokenMask token={save.access_token} />
									</td>
									<td class="text-end">
										<div class="flex items-center gap-4 justify-end">
											<button
												class="btn variant-ghost"
												use:clipboard={save.access_token}
												on:click={() => {
													toastStore.trigger({
														message: 'Access token copied successsfully.',
													});
												}}
											>
												<div class="w-6 h-6"><IoMdCopy class="w-10 h-10" /></div>
											</button>
											<button class="btn variant-ghost" on:click={() => selectAgent(save)}>
												select
											</button>
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
			<div class="flex gap-4 justify-end">
				<a class="btn variant-ghost-primary" href="/agents/import">import using access token</a>
				<a class="btn variant-ghost-primary" href="/agents/new">create a new game</a>
			</div>
		{/if}
	</div>
</div>
<Toast />
