import { generateSpaceTradersApi } from '$lib/spacetraders';
import { writable } from 'svelte/store';

export type Agent = {
	symbol: string;
	access_token: string;
	api: ReturnType<typeof generateSpaceTradersApi>;
};

export type SelectedAgent = Omit<Agent, 'api'>;

export const agent = writable<Agent | null>(null);

export const setSelectedAgent = (selectAgent: SelectedAgent) => {
	generateSpaceTradersApi;
	agent.set({
		...selectAgent,
		api: generateSpaceTradersApi(selectAgent.access_token)
	});
};
