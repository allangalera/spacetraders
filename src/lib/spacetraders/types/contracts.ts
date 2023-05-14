import type { CONTRACT_TYPES_LIST } from '$lib/spacetraders/constants/contract';

export type ContractType = (typeof CONTRACT_TYPES_LIST)[number];

export type ContractPayment = {
	onAccepted: number;
	onFulfilled: number;
};

export type ContractDeliverGood = {
	tradeSymbol: string;
	destinationSymbol: string;
	unitsRequired: number;
	unitsFulfilled: number;
};

export type ContractTerms = {
	deadline: string;
	payment: ContractPayment;
	deliver: ContractDeliverGood[];
};

export type Contract = {
	id: string;
	factionSymbol: string;
	type: ContractType;
	terms: ContractTerms;
	accepted: boolean;
	fulfilled: boolean;
	expiration: string;
};
