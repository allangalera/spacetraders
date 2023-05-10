<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import IoMdPerson from 'svelte-icons/io/IoMdPerson.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead"><a href="/">AGSTUI</a></svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="w-6 h-6"><IoMdPerson /></div>
		<a href="/api/oauth/signout">Log out</a>
	</svelte:fragment>
</AppBar>
