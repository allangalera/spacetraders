import { z } from 'zod';

export const CONTRACT_TYPES = {
	PROCUREMENT: 'PROCUREMENT',
	TRANSPORT: 'TRANSPORT',
	SHUTTLE: 'SHUTTLE'
} as const;

export const CONTRACT_TYPES_LIST = Object.values(CONTRACT_TYPES);

export const ContractTypeSchema = z.enum(CONTRACT_TYPES_LIST as [string, ...string[]]);
