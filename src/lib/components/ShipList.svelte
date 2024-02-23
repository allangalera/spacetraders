<script lang="ts">
	import type { Ship } from '$lib/spacetraders/types/ships';

	export let ships: Ship[] | null;
</script>

{#if ships}
	<h3>Ships</h3>
	<table class="">
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
						<div class="flex items-center justify-center" />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- </div> -->
{:else}
	<p>loading . . .</p>
{/if}
