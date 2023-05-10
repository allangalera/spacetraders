import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();

	console.log({ session });

	if (session) {
		await auth.invalidateSession(session.sessionId);
	}

	throw redirect(302, '/');
};
