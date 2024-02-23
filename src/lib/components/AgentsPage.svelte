<script lang="ts">
	import TokenMask from '$lib/components/TokenMask.svelte';
	import CopyIcon from 'virtual:icons/mdi/content-copy';
	import type { SelectedAgent } from '$lib/stores/agent';
	import { setSelectedAgent } from '$lib/stores/agent';
	import { clipboard } from '$lib/actions/clipboard';
	import ky from 'ky';
	import type { InferModel } from 'drizzle-orm';
	import type { saves } from '$lib/db/schema';

	export let savedGames: (InferModel<typeof saves, 'select'> & { isLoading?: boolean })[];

	const selectAgent = (selectedAgent: SelectedAgent) => {
		setSelectedAgent(selectedAgent);
	};

	const handleDeleteAgent = async (saveId: string) => {
		savedGames = savedGames.map((i) => {
			if (i.id === saveId) {
				return {
					...i,
					isLoading: true,
				};
			}
			return i;
		});
		try {
			const response = await ky.delete(`/api/agents/${saveId}`);

			console.log({ response });
			savedGames = savedGames.filter((i) => i.id !== saveId);
		} catch (error) {
			savedGames = savedGames.map((i) => {
				if (i.id === saveId) {
					return {
						...i,
						isLoading: false,
					};
				}
				return i;
			});
		}
	};
</script>

<h1 class="text-center">Welcome AGSTUI</h1>
<h2 class="text-center mb-16">
	a <a class="" href="https://spacetraders.io" target="_blank">Spacetraders</a> ui
</h2>
<div class="">
	<table class="">
		<thead>
			<tr>
				<th class="text-center">Symbol</th>
				<th class="text-center">Access Token</th>
				<th class="text-center">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#if savedGames && savedGames.length === 0}
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
								<button class="" use:clipboard={save.access_token}>
									<div class="w-6 h-6"><CopyIcon /></div>
								</button>
								<button class="" on:click={() => selectAgent(save)}> select </button>
								<button class="" on:click={() => handleDeleteAgent(save.id)}> delete </button>
							</div>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
<div class="flex gap-4 justify-end">
	<a class="" href="/agents/import">import using access token</a>
	<a class="" href="/agents/new">create a new game</a>
</div>
<div id="clipboard" />
