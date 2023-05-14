import type { ImportAgentSchema, NewAgentSchema } from '$lib/spacetraders/constants';
import type { z } from 'zod';

export type ApiResponse<T> = {
	data: T;
};

export type NewAgent = z.infer<typeof NewAgentSchema>;

export type ImportAgent = z.infer<typeof ImportAgentSchema>;
