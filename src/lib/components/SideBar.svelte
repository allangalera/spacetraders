<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	const storeValue: Writable<number> = writable(0);
</script>

<AppRail selected={storeValue}>
	<AppRailTile label="Tile 1" value={0}>(icon)</AppRailTile>
	<AppRailTile label="Tile 2" value={1}>(icon)</AppRailTile>
	<AppRailTile label="Tile 3" value={2}>(icon)</AppRailTile>
</AppRail>
