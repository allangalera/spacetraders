import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { dev } from '$app/environment';
import { discord } from '@lucia-auth/oauth/providers';
import { env } from '$env/dynamic/private';

import { connection } from './db';

export const auth = lucia({
	adapter: planetscale(connection),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
		};
	},
});

export const discordAuth = discord(auth, {
	clientId: env.DISCORD_CLIENT_ID,
	clientSecret: env.DISCORD_CLIENT_SECRET,
	redirectUri: env.DISCORD_REDIRECT_URI,
	scope: [],
});

export type Auth = typeof auth;
