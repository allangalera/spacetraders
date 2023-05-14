<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import IoMdPerson from 'svelte-icons/io/IoMdPerson.svelte';
	import { agentStore } from '$lib/stores/agent';
	import type { User } from '$lib/stores/user';

	export let user: User;
</script>

<AppBar>
	<svelte:fragment slot="lead"><a href="/">AGSTUI</a></svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $agentStore}
			<p>
				Symbol: {$agentStore.symbol}
			</p>
		{/if}
		{#if user}
			<div class="w-6 h-6"><IoMdPerson /></div>
			<a href="/api/oauth/signout">Log out</a>
		{/if}
	</svelte:fragment>
</AppBar>
