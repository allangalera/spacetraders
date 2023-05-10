import type { SSTConfig } from 'sst';
import { SvelteKitSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'spacetraders',
			region: 'us-east-1'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new SvelteKitSite(stack, 'site', {
				buildCommand: 'pnpm build',
				customDomain: {
					domainName: 'spacetraders.allangalera.com',
					hostedZone: 'allangalera.com'
				}
			});
			stack.addOutputs({
				url: site.url
			});
		});
	}
} satisfies SSTConfig;
