import { generateSpaceTradersApi } from '$lib/spacetraders';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { derived, type Writable } from 'svelte/store';

export type Agent = {
	symbol: string;
	access_token: string;
};

export type SelectedAgent = Omit<Agent, 'api'>;

export const agentStore: Writable<Agent | null> = localStorageStore('agent', null);

export const setSelectedAgent = (selectedAgent: SelectedAgent) => {
	agentStore.set(selectedAgent);
};

export const apiStore = derived(agentStore, ($agent) =>
	$agent?.access_token ? generateSpaceTradersApi($agent?.access_token) : null,
);
