import type { ImportAgentSchema, NewAgentSchema } from '$lib/spacetraders/constants';
import type { z } from 'zod';

export type ApiResponse<T> = {
	data: T;
};

export type NewAgent = z.infer<typeof NewAgentSchema>;

export type ImportAgent = z.infer<typeof ImportAgentSchema>;

export type Agent = {
	accountId: string;
	symbol: string;
	headquarters: string;
	credits: number;
};

export type Contract = {
	id: string;
	factionSymbol: string;
	type: string;
	terms: {
		deadline: string;
		payment: {
			onAccepted: number;
			onFulfilled: number;
		};
		deliver: {
			tradeSymbol: string;
			destinationSymbol: string;
			unitsRequired: number;
			unitsFulfilled: number;
		}[];
	};
	accepted: boolean;
	fulfilled: boolean;
	expiration: string;
};

export type Faction = {
	symbol: string;
	name: string;
	description: string;
	headquarters: string;
	traits: {
		symbol: string;
		name: string;
		description: string;
	}[];
};

export type Ship = {
	symbol: string;
	nav: {
		systemSymbol: string;
		waypointSymbol: string;
		route: {
			departure: {
				symbol: string;
				type: string;
				systemSymbol: string;
				x: number;
				y: number;
			};
			destination: {
				symbol: string;
				type: string;
				systemSymbol: string;
				x: number;
				y: number;
			};
			arrival: string;
			departureTime: string;
		};
		status: string;
		flightMode: string;
	};
	crew: {
		current: number;
		capacity: number;
		required: number;
		rotation: string;
		morale: number;
		wages: number;
	};
	fuel: {
		current: number;
		capacity: number;
		consumed: {
			amount: number;
			timestamp: string;
		};
	};
	frame: {
		symbol: string;
		name: string;
		description: string;
		moduleSlots: number;
		mountingPoints: number;
		fuelCapacity: number;
		condition: number;
		requirements: {
			power: number;
			crew: number;
		};
	};
	reactor: {
		symbol: string;
		name: string;
		description: string;
		condition: number;
		powerOutput: number;
		requirements: {
			crew: number;
		};
	};
	engine: {
		symbol: string;
		name: string;
		description: string;
		condition: number;
		speed: number;
		requirements: {
			power: number;
			crew: number;
		};
	};
	modules: {
		symbol: string;
		name: string;
		description: string;
		capacity?: number;
		range?: number;
		requirements: {
			crew: number;
			power: number;
			slots: number;
		};
	}[];
	mounts: {
		symbol: string;
		name: string;
		description: string;
		strenght: number;
		deposits?: string[];
		requirements: {
			crew: number;
			power: number;
		};
	}[];
	registration: {
		name: string;
		factionSymbol: string;
		role: string;
	};
	cargo: {
		capacity: number;
		units: number;
		inventory: {
			symbol: string;
			name: string;
			description: string;
			units: number;
		}[];
	};
};
