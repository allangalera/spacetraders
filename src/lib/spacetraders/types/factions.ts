import type { TRAITS_LIST } from '$lib/spacetraders/constants/factions';


export type TraitsSymbols = (typeof TRAITS_LIST)[number];

export type Trait = {
	symbol: TraitsSymbols;
	name: string;
	description: string;
};

export type Faction = {
	symbol: string;
	name: string;
	description: string;
	headquarters: string;
	traits: Trait[];
	isRecruiting: boolean;
};
