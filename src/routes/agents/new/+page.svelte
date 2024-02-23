<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	export let data: PageData;
	const { form, enhance, errors, delayed } = superForm(data.form);
</script>

<div class="flex flex-col justify-center items-center">
	<div class="max-w-2xl w-full">
		<h1>Create a new game</h1>
		<form class="flex flex-col gap-4 mt-4 relative" method="post" use:enhance>
			{#if $delayed}
				<div class="absolute h-full w-full flex justify-center items-center bg-surface-900/50">
					Loading . . .
				</div>
			{/if}
			<label class="label">
				<span>Symbol:</span>
				<input
					type="text"
					class={`input${$errors.symbol ? ' input-error' : ''}`}
					name="symbol"
					title="Symbol (text)"
					placeholder="SPACE_INV4DER"
					bind:value={$form.symbol}
					data-invalid={$errors.symbol}
				/>
				<span class={`text-sm${$errors.symbol ? ' text-red-600' : ''}`}>
					Help: The symbol must be between 3 and 14 characters and must contain only alpha-numeric
					characters, as well as dashes and underscores
				</span>
			</label>
			<div class="flex flex-col gap-2">
				<p>Faction:</p>
				<div class="space-y-2">
					{#each ['COSMIC'] as faction}
						<label class="flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								name="faction"
								value={faction}
								bind:group={$form.faction}
							/>
							<p>{faction}</p>
						</label>
					{/each}
				</div>
			</div>
			<button class="btn variant-ghost-primary">Submit</button>
		</form>
	</div>
</div>
