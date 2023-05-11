<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import IoMdPerson from 'svelte-icons/io/IoMdPerson.svelte';
	import type { Agent } from '$lib/stores/agent';
	import { agent } from '$lib/stores/agent';

	let agentValue: Agent | null = null;

	agent.subscribe((value) => {
		agentValue = value;
	});
</script>

<AppBar>
	<svelte:fragment slot="lead"><a href="/">AGSTUI</a></svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $agent}
			<div>
				<p>Symbol: {$agent.symbol}</p>
			</div>
		{/if}
		<div class="w-6 h-6"><IoMdPerson /></div>
		<a href="/api/oauth/signout">Log out</a>
	</svelte:fragment>
</AppBar>
