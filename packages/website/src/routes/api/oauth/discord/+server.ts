import { auth, discordAuth } from '$lib/server/lucia.js';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	// get code and state params from url
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// get stored state from cookies
	const storedState = cookies.get('discord_oauth_state');

	// validate state
	if (state !== storedState) throw new Response(null, { status: 401 });

	if (!code) throw new Response(null, { status: 500 });

	try {
		const { existingUser, providerUser, createUser } = await discordAuth.validateCallback(code);

		console.log({ providerUser, existingUser });

		const getUser = async () => {
			if (existingUser) return existingUser;
			// create a new user if the user does not exist
			return await createUser({
				username: providerUser.username
			});
		};
		const user = await getUser();
		console.log({ user });
		const session = await auth.createSession(user.userId);
		locals.auth.setSession(session);
	} catch (e) {
		// invalid code
		return new Response(null, {
			status: 500
		});
	}
	throw redirect(302, '/');
};
