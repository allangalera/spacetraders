import ky from 'ky';

import type { SpacetradersStatus, ApiResponse, NewAgent } from '$lib/spacetraders/types';
import type { Contract } from '$lib/spacetraders/types/contracts';
import type { Agent } from '$lib/spacetraders/types/agents';
import type { Faction } from '$lib/spacetraders/types/factions';
import type { Ship } from '$lib/spacetraders/types/ships';
import { NewAgentSchema } from '$lib/spacetraders/constants';

const SPACETRADERS_API_URL = 'https://api.spacetraders.io/v2';

export const generateSpaceTradersApi = (accessToken: string) => {
	const client = ky.extend({
		prefixUrl: SPACETRADERS_API_URL,
	});
	const authenticatedClient = ky.extend({
		prefixUrl: SPACETRADERS_API_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const spacetraders = {
		getStatus: async () => {
			return await client.get('').json<SpacetradersStatus>();
		},
	};

	const agent = {
		getDetails: async () => {
			return await authenticatedClient.get('my/agent').json<ApiResponse<Agent>>();
		},
	};

	const fleet = {
		listShips: async () => {
			return await authenticatedClient.get('my/ships').json<ApiResponse<Ship[]>>();
		},
	};

	return {
		spacetraders,
		agent,
		fleet,
	};
};

export const registerNewAgent = async (newAgent: NewAgent) => {
	const client = ky.extend({
		prefixUrl: SPACETRADERS_API_URL,
	});

	NewAgentSchema.parse(newAgent);

	return await client
		.post('register', {
			json: newAgent,
		})
		.json<
			ApiResponse<{
				token: string;
				agent: Agent;
				contract: Contract;
				faction: Faction;
				ship: Ship;
			}>
		>();
};
