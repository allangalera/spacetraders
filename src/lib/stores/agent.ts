import { generateSpaceTradersApi } from '$lib/spacetraders';
import { derived, writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Agent = {
	symbol: string;
	access_token: string;
};

export type SelectedAgent = Omit<Agent, 'api'>;

const LOCAL_STORAGE_KEY = 'agent';

const getInitialValue = (initialValue: unknown) => {
	if (!browser) {
		return initialValue;
	}
	const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);

	if (!localStorageValue) {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialValue));
		return initialValue;
	}

	return JSON.parse(localStorageValue);
};

export const agentStore: Writable<Agent | null> = writable(getInitialValue(null));

agentStore.subscribe((newValue) => {
	if (!browser) {
		return;
	}
	if (newValue) {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
		return;
	}

	localStorage.removeItem(LOCAL_STORAGE_KEY);
});

export const setSelectedAgent = (selectedAgent: SelectedAgent) => {
	agentStore.set(selectedAgent);
};

export const resetAgent = () => {
	agentStore.set(null);
};

export const apiStore = derived(agentStore, ($agent) =>
	$agent?.access_token ? generateSpaceTradersApi($agent?.access_token) : null,
);
