import { DEFAULT_FACTION, FactionSchema } from '$lib/constants/factions';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { saves } from '$lib/db/schema';
import { nanoid } from 'nanoid';

const NewAgentForm = z.object({
	symbol: z
		.string()
		.min(3)
		.max(14)
		.regex(/^([a-z0-9-_]){3,14}$/gi),
	faction: FactionSchema.default(DEFAULT_FACTION)
});

type NewAgent = z.infer<typeof NewAgentForm>;

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		console.log('redirect to login');
		throw redirect(302, '/login');
	}

	const form = await superValidate(NewAgentForm);
	console.log({ form });

	return { form };
};

const rand = () => Math.random().toString(36).substr(2);

const spacetradersApi = {
	createAgent: async ({ symbol, faction }: NewAgent) => {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		return {
			data: {
				token: rand(),
				agent: {
					accountId: rand(),
					symbol: symbol,
					headquarters: rand(),
					credits: 100000
				},
				contract: {},
				faction: {
					symbol: faction
				},
				ship: {}
			}
		};
	}
};

export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.auth.validateUser();
		const form = await superValidate(request, NewAgentForm);
		console.log({ form });

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		console.log({ user });

		const response = await spacetradersApi.createAgent(form.data);

		await db.insert(saves).values({
			id: nanoid(),
			userId: user.userId,
			symbol: form.data.symbol,
			access_token: response.data.token
		});

		throw redirect(302, '/');

		// insert in the database

		return { form };
	}
} satisfies Actions;
