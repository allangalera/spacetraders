import ky from 'ky';

import type { ApiResponse, NewAgent } from '$lib/spacetraders/types';
import type { Contract } from '$lib/spacetraders/types/contracts';
import type { Agent } from '$lib/spacetraders/types/agents';
import type { Faction } from '$lib/spacetraders/types/factions';
import type { Ship } from '$lib/spacetraders/types/ships';
import { NewAgentSchema } from '$lib/spacetraders/constants';

const SPACETRADERS_API_URL = 'https://api.spacetraders.io/v2';

export const generateSpaceTradersApi = (accessToken: string) => {
	const client = ky.extend({
		prefixUrl: SPACETRADERS_API_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const agent = {
		getDetails: async () => {
			return await client.get('my/agent').json<ApiResponse<Agent>>();
		},
	};

	const fleet = {
		listShips: async () => {
			return await client.get('my/ships').json<ApiResponse<Ship[]>>();
		},
	};

	return {
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
