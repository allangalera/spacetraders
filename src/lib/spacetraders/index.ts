import ky from 'ky';

import type {
	Agent,
	ApiResponse,
	Contract,
	Faction,
	NewAgent,
	Ship
} from '$lib/spacetraders/types';
import { NewAgentSchema } from '$lib/spacetraders/constants';

const SPACETRADERS_API_URL = 'https://api.spacetraders.io/v2';

export const generateSpaceTradersApi = (accessToken: string) => {
	const client = ky.extend({
		prefixUrl: SPACETRADERS_API_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const agents = {
		getDetails: async () => {
			return await client.get('my/agent').json<ApiResponse<Agent>>();
		}
	};

	return {
		agents
	};
};

export const registerNewAgent = async (newAgent: NewAgent) => {
	const client = ky.extend({
		prefixUrl: SPACETRADERS_API_URL
	});

	NewAgentSchema.parse(newAgent);

	return await client
		.post('/register', {
			json: newAgent
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
