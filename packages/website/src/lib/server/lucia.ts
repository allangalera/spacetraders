import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { dev } from '$app/environment';
import { discord } from '@lucia-auth/oauth/providers';
import { Config } from 'sst/node/config';

import { connection } from './db';

export const auth = lucia({
	adapter: planetscale(connection),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export const discordAuth = discord(auth, {
	clientId: Config.DISCORD_CLIENT_ID,
	clientSecret: Config.DISCORD_CLIENT_SECRET,
	redirectUri: Config.DISCORD_REDIRECT_URI || 'http://localhost:5173/api/oauth/discord',
	scope: []
});

export type Auth = typeof auth;
