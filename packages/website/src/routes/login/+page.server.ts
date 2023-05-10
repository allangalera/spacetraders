import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		console.log('is already authenticated -> redirect to home');
		throw redirect(302, '/');
	}
};
