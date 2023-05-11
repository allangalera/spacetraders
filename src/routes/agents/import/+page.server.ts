import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { saves } from '$lib/db/schema';
import { nanoid } from 'nanoid';
import { generateSpaceTradersApi } from '$lib/spacetraders';
import { ImportAgentSchema } from '$lib/spacetraders/constants';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	const form = await superValidate(ImportAgentSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		const form = await superValidate(request, ImportAgentSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const api = generateSpaceTradersApi(form.data.access_token);

		const response = await api.agents.getDetails();

		await db.insert(saves).values({
			id: nanoid(),
			userId: user.userId,
			symbol: response.data.symbol,
			access_token: form.data.access_token
		});

		throw redirect(302, '/');
	}
} satisfies Actions;
