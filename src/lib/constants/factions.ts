import { z } from 'zod';

export const FACTIONS = {
	COSMIC: 'COSMIC',
	VOID: 'VOID',
	GALACTIC: 'GALACTIC',
	QUANTUM: 'QUANTUM',
	DOMINION: 'DOMINION'
} as const;

export const FACTIONS_LIST = Object.values(FACTIONS);

export const DEFAULT_FACTION = FACTIONS.COSMIC;

export const FactionSchema = z.enum(FACTIONS_LIST as [string, ...string[]]);
