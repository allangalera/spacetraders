import ky from 'ky';

import type { SpacetradersStatus, ApiResponse, NewAgent } from '$lib/spacetraders/types';
import type { Contract } from '$lib/spacetraders/types/contracts';
import type { Agent } from '$lib/spacetraders/types/agents';
import type { Faction } from '$lib/spacetraders/types/factions';
import type { Ship } from '$lib/spacetraders/types/ships';
import { NewAgentSchema } from '$lib/spacetraders/constants';
import type { System } from './types/system';
import { z } from 'zod';

const SPACETRADERS_API_URL = 'https://api.spacetraders.io/v2';

const client = ky.extend({
	prefixUrl: SPACETRADERS_API_URL,
});

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

	const system = {
		get: async (system: string) => {
			return await authenticatedClient.get(`systems/${system}`).json<ApiResponse<System>>();
		},
	};

	return {
		spacetraders,
		agent,
		fleet,
		system,
	};
};

const getFactionsQueryParametersSchema = z.object({
	page: z.number().positive().optional(),
	limit: z.number().int().min(1).max(20),
});

type GetFactionsQueryParameters = z.infer<typeof getFactionsQueryParametersSchema>;

export const getFactions = async (params: GetFactionsQueryParameters) => {
	const validatedQueryParameters = getFactionsQueryParametersSchema.parse(params);
	return await client
		.get('factions', {
			searchParams: validatedQueryParameters,
		})
		.json<ApiResponse<Faction[]>>();
};
export const registerNewAgent = async (newAgent: NewAgent) => {
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
