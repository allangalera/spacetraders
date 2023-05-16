<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import IoMdPerson from 'svelte-icons/io/IoMdPerson.svelte';
	import { resetAgent, agentStore } from '$lib/stores/agent';
	import type { User } from '$lib/stores/user';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let user: User;

	const userMenu: PopupSettings = {
		event: 'click',
		target: 'userMenu',
		placement: 'bottom',
	};

	const switchAgent = () => {
		resetAgent();
		if (window.location.pathname !== '/') {
			goto('/');
		}
	};
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
			<button class="p-2 btn variant-ringed" use:popup={userMenu}>
				<div class="w-6 h-6"><IoMdPerson /></div></button
			>
		{/if}
	</svelte:fragment>
</AppBar>

<div class="card bg-surface-50-900-token" data-popup="userMenu">
	<div class="flex flex-col gap-1">
		{#if $agentStore}
			<button class="btn hover:variant-ghost-surface" on:click={switchAgent}> Switch Agent </button>
		{/if}
		<a class="btn hover:variant-ghost-surface" href="/api/oauth/signout">Log Out</a>
	</div>
	<div class="arrow bg-surface-50-900-token" />
</div>
