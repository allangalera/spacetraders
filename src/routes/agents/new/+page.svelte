<script lang="ts">
	import TraitWithToolipDescription from '$lib/components/TraitWithToolipDescription.svelte';
	import Universe from '$lib/components/Universe.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	export let data: PageData;
	const { form, enhance, errors, delayed } = superForm(data.form);

	$: allowedFactons = data.factions.filter((faction) => faction.isRecruiting);
</script>

<Universe />
<div class="flex flex-col justify-center items-center">
	<div class="max-w-2xl w-full">
		<h1 class="text-2xl font-bold text-center">Create a new game</h1>
		<form class="flex flex-col gap-4 mt-4 relative" method="post" use:enhance>
			{#if $delayed}
				<div class="absolute h-full w-full flex justify-center items-center bg-surface-900/50">
					Loading . . .
				</div>
			{/if}
			<label class="flex flex-col gap-2">
				<span class="text-xl font-bold">Symbol:</span>
				<input
					type="text"
					class="text-white placeholder:text-slate-300 bg-transparent border border-slate-50 focus:ring-0 focus:outline-0 focus:border-green-400"
					name="symbol"
					title="Symbol (text)"
					placeholder="SPACE_INV4DER"
					bind:value={$form.symbol}
					data-invalid={$errors.symbol}
				/>
				<span class={`text-sm${$errors.symbol ? ' text-red-400' : ''}`}>
					Help: The symbol must be between 3 and 14 characters and must contain only alpha-numeric
					characters, as well as dashes and underscores
				</span>
			</label>
			<div class="flex flex-col gap-2">
				<p class="text-xl font-bold">Faction:</p>
				<div>
					<ul class="flex flex-col gap-2">
						{#each data.factions as faction}
							<li>
								<input
									id={`${faction.symbol}`}
									class="hidden peer"
									type="radio"
									name="faction"
									disabled={!faction.isRecruiting}
									value={faction.symbol}
									bind:group={$form.faction}
								/>
								<label
									for={`${faction.symbol}`}
									class="flex gap-4 items-center cursor-pointer border-2 p-2 border-slate-400 peer-disabled:border-slate-800 peer-disabled:text-slate-500 peer-checked:border-green-400"
								>
									<div class="flex flex-col gap-1">
										<p class="font-bold">{faction.name}</p>
										<p class="leading-tight">{faction.description}</p>
										<div class="flex gap-4 font-bold">
											Traits:
											<div class="flex gap-4 flex-wrap">
												{#each faction.traits as trait}
													<TraitWithToolipDescription {trait} />
												{/each}
											</div>
										</div>
									</div>
								</label>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<button class="px-1 py-2 border rounded hover:border-green-400">Submit</button>
		</form>
	</div>
</div>
