import type { ImportAgentSchema, NewAgentSchema } from '$lib/spacetraders/constants';
import type { z } from 'zod';

export type ApiResponse<T> = {
	data: T;
};

export type NewAgent = z.infer<typeof NewAgentSchema>;

export type ImportAgent = z.infer<typeof ImportAgentSchema>;

export type SpacetradersStatus = {
	status: string;
	version: string;
	resetDate: string;
	description: string;
	stats: {
		agents: number;
		ships: number;
		systems: number;
		waypoints: number;
	};
	leaderboards: {
		mostCredits: {
			agentSymbol: string;
			credits: number;
		}[];
		mostSubmittedCharts: {
			agentSymbol: string;
			chartCount: number;
		}[];
	};
	serverResets: {
		next: string;
		frequency: string;
	};
	announcements: {
		title: string;
		body: string;
	}[];
	links: {
		name: string;
		url: string;
	}[];
};
