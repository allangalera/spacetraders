import { DEFAULT_FACTION, FactionSchema } from '$lib/spacetraders/constants/factions';
import { z } from 'zod';

export const NewAgentSchema = z.object({
	symbol: z
		.string()
		.min(3)
		.max(14)
		.regex(/^([a-z0-9-_]){3,14}$/gi),
	faction: FactionSchema.default(DEFAULT_FACTION)
});

export const ImportAgentSchema = z.object({
	access_token: z.string().min(2)
});
