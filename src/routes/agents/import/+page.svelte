<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance, errors, delayed } = superForm(data.form);
</script>

<div class="flex flex-col justify-center items-center">
	<div class="max-w-2xl w-full">
		<h1>Import using access token</h1>
		<form class="flex flex-col gap-4 mt-4 relative" method="post" use:enhance>
			{#if $delayed}
				<div class="absolute h-full w-full flex justify-center items-center bg-surface-900/50">
					Loading . . .
				</div>
			{/if}
			<label class="label">
				<span>Access Token:</span>
				<input
					type="text"
					class={`input${$errors.access_token ? ' input-error' : ''}`}
					name="access_token"
					title="Access Token"
					bind:value={$form.access_token}
					data-invalid={$errors.access_token}
				/>
			</label>
			<button class="btn variant-ghost-primary">Submit</button>
		</form>
	</div>
</div>
