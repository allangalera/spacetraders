<script lang="ts">
	import type { Agent } from '$lib/spacetraders/types/agents';

	export let agentDetails: Agent;
</script>

<div class="card variant-ghost-primary">
	<header class="card-header p-4 text-center">
		<h4>Agent Details</h4>
	</header>
	<section class="p-4">
		<p>Account ID: {agentDetails.accountId}</p>
		<p>Credits: {agentDetails.credits}</p>
		<p>Headquarter: {agentDetails.headquarters}</p>
	</section>
</div>
