<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import UserOutlineIcon from 'virtual:icons/mdi/user-outline';
	import { resetAgent, agentStore } from '$lib/stores/agent';
	import type { User } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	export let user: User;

	const {
		elements: { menu, item, trigger, arrow },
	} = createDropdownMenu();

	const switchAgent = () => {
		resetAgent();
		if (window.location.pathname !== '/') {
			goto('/');
		}
	};
</script>

<header class="p-5 flex justify-between">
	<a href="/">AGSTUI</a>
	{#if $agentStore}
		<p>
			Symbol: {$agentStore.symbol}
		</p>
	{/if}
	{#if user}
		<button class="p-2" use:melt={$trigger}>
			<div class="w-6 h-6"><UserOutlineIcon /></div>
		</button>
	{/if}
</header>

<div class="bg-slate-300 flex flex-col gap-4 p-4" use:melt={$menu}>
	{#if $agentStore}
		<button use:melt={$item} class="" on:click={switchAgent}> Switch Agent </button>
	{/if}
	<a use:melt={$item} class="" href="/api/oauth/signout">Log Out</a>
	<div use:melt={$arrow} />
</div>

<style>
	header {
		z-index: 2;
	}
</style>
