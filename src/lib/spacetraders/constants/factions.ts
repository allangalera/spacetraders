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

export const TRAITS = {
	BUREAUCRATIC: 'BUREAUCRATIC',
	SECRETIVE: 'SECRETIVE',
	CAPITALISTIC: 'CAPITALISTIC',
	INDUSTRIOUS: 'INDUSTRIOUS',
	PEACEFUL: 'PEACEFUL',
	DISTRUSTFUL: 'DISTRUSTFUL',
	WELCOMING: 'WELCOMING',
	SMUGGLERS: 'SMUGGLERS',
	SCAVENGERS: 'SCAVENGERS',
	REBELLIOUS: 'REBELLIOUS',
	EXILES: 'EXILES',
	PIRATES: 'PIRATES',
	RAIDERS: 'RAIDERS',
	CLAN: 'CLAN',
	GUILD: 'GUILD',
	DOMINION: 'DOMINION',
	FRINGE: 'FRINGE',
	FORSAKEN: 'FORSAKEN',
	ISOLATED: 'ISOLATED',
	LOCALIZED: 'LOCALIZED',
	ESTABLISHED: 'ESTABLISHED',
	NOTABLE: 'NOTABLE',
	DOMINANT: 'DOMINANT',
	INESCAPABLE: 'INESCAPABLE',
	INNOVATIVE: 'INNOVATIVE',
	BOLD: 'BOLD',
	VISIONARY: 'VISIONARY',
	CURIOUS: 'CURIOUS',
	DARING: 'DARING',
	EXPLORATORY: 'EXPLORATORY',
	RESOURCEFUL: 'RESOURCEFUL',
	FLEXIBLE: 'FLEXIBLE',
	COOPERATIVE: 'COOPERATIVE',
	UNITED: 'UNITED',
	STRATEGIC: 'STRATEGIC',
	INTELLIGENT: 'INTELLIGENT',
	RESEARCH_FOCUSED: 'RESEARCH_FOCUSED',
	COLLABORATIVE: 'COLLABORATIVE',
	PROGRESSIVE: 'PROGRESSIVE',
	MILITARISTIC: 'MILITARISTIC',
	TECHNOLOGICALLY_ADVANCED: 'TECHNOLOGICALLY_ADVANCED',
	AGGRESSIVE: 'AGGRESSIVE',
	IMPERIALISTIC: 'IMPERIALISTIC',
	TREASURE_HUNTERS: 'TREASURE_HUNTERS',
	DEXTEROUS: 'DEXTEROUS',
	UNPREDICTABLE: 'UNPREDICTABLE',
	BRUTAL: 'BRUTAL',
	FLEETING: 'FLEETING',
	ADAPTABLE: 'ADAPTABLE',
	SELF_SUFFICIENT: 'SELF_SUFFICIENT',
	DEFENSIVE: 'DEFENSIVE',
	PROUD: 'PROUD',
	DIVERSE: 'DIVERSE',
	INDEPENDENT: 'INDEPENDENT',
	SELF_INTERESTED: 'SELF_INTERESTED',
	FRAGMENTED: 'FRAGMENTED',
	COMMERCIAL: 'COMMERCIAL',
	FREE_MARKETS: 'FREE_MARKETS',
	ENTREPRENEURIAL: 'ENTREPRENEURIAL'
} as const;

export const TRAITS_LIST = Object.values(TRAITS);
