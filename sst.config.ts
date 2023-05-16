import type { SSTConfig } from 'sst';
import { SvelteKitSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'spacetraders',
			region: 'us-east-1',
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new SvelteKitSite(stack, 'site', {
				buildCommand: 'pnpm build',
				customDomain: {
					domainName: 'spacetraders.allangalera.com',
					hostedZone: 'allangalera.com',
				},
				environment: {
					DATABASE_HOST: process.env.DATABASE_HOST,
					DATABASE_USERNAME: process.env.DATABASE_USERNAME,
					DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
					DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
					DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
					DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
				},
			});
			stack.addOutputs({
				url: site.url,
			});
		});
	},
} satisfies SSTConfig;
