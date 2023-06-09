import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { saves } from '$lib/db/schema';
import { nanoid } from 'nanoid';
import { NewAgentSchema } from '$lib/spacetraders/constants';
import { registerNewAgent } from '$lib/spacetraders';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	const form = await superValidate(NewAgentSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		const form = await superValidate(request, NewAgentSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await registerNewAgent(form.data);

		await db.insert(saves).values({
			id: nanoid(),
			userId: user.userId,
			symbol: form.data.symbol,
			access_token: response.data.token
		});

		throw redirect(302, '/');
	}
} satisfies Actions;
