import type { FACTIONS_LIST, TRAITS_LIST } from '$lib/spacetraders/constants/factions';

export type Factions = (typeof FACTIONS_LIST)[number];

export type TraitsSymbols = (typeof TRAITS_LIST)[number];

export type Trait = {
	symbol: TraitsSymbols;
	name: string;
	description: string;
};

export type Faction = {
	symbol: Factions;
	name: string;
	description: string;
	headquarters: string;
	traits: Trait[];
};
