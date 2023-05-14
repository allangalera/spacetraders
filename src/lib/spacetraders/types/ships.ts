import type {
	SHIP_CREW_ROTATIONS_LIST,
	SHIP_DEPOSITS_LIST,
	SHIP_ENGINES_LIST,
	SHIP_FRAME_SYMBOLS_LIST,
	SHIP_MODULES_LIST,
	SHIP_MOUNTS_LIST,
	SHIP_NAV_FLIGHT_MODES_LIST,
	SHIP_NAV_ROUTE_WAYPOINTS_LIST,
	SHIP_REACTORS_LIST,
	SHIP_REGISTRATION_ROLES_LIST,
	SHIP_VAR_STATUS_LIST,
} from '$lib/spacetraders/constants/ships';

export type ShipCargoItem = {
	symbol: string;
	name: string;
	description: string;
	units: number;
};

export type ShipCargo = {
	capacity: number;
	units: number;
	inventory: ShipCargoItem;
};

export type ShipRegistrationRole = (typeof SHIP_REGISTRATION_ROLES_LIST)[number];

export type ShipRegistration = {
	name: string;
	factionSymbol: string;
	role: ShipRegistrationRole;
};

export type ShipNavRouteWaypointTypes = (typeof SHIP_NAV_ROUTE_WAYPOINTS_LIST)[number];

export type ShipNavRouteWaypoint = {
	symbol: string;
	type: ShipNavRouteWaypointTypes;
	systemSymbol: string;
	x: number;
	y: number;
};

export type ShipNavRouteDestination = ShipNavRouteWaypoint;
export type ShipNavRouteDeparture = ShipNavRouteWaypoint;

export type ShipNavRoute = {
	destination: ShipNavRouteDestination;
	departure: ShipNavRouteDeparture;
	departureTime: string;
	arrival: string;
};

export type ShipNavStatus = (typeof SHIP_VAR_STATUS_LIST)[number];

export type ShipNavFlightMode = (typeof SHIP_NAV_FLIGHT_MODES_LIST)[number];

export type ShipNav = {
	systemSymbol: string;
	waypointSymbol: string;
	route: ShipNavRoute;
	status: ShipNavStatus;
	flightMode: ShipNavFlightMode;
};

export type ShipCrewRotation = (typeof SHIP_CREW_ROTATIONS_LIST)[number];

export type ShipCrew = {
	current: number;
	required: number;
	capacity: number;
	rotation: ShipCrewRotation;
	morale: number;
	wages: number;
};

export type ShipFuel = {
	current: number;
	capacity: number;
	consumed: {
		amount: number;
		timestamp: string;
	};
};

export type ShipFrameSymbol = (typeof SHIP_FRAME_SYMBOLS_LIST)[number];

export type ShipFrame = {
	symbol: ShipFrameSymbol;
	name: string;
	description: string;
	condition: number;
	moduleSlots: number;
	mountingPoints: number;
	fuelCapacity: number;
	requirements: {
		power?: number;
		crew?: number;
		slots?: number;
	};
};

export type ShipReactorSymbol = (typeof SHIP_REACTORS_LIST)[number];

export type ShipRequirements = {
	power?: number;
	crew?: number;
	slots?: number;
};

export type ShipReactor = {
	symbol: ShipReactorSymbol;
	name: string;
	description: string;
	condition?: number;
	powerOutput: number;
	requirements: ShipRequirements;
};

export type ShipEngineSymbol = (typeof SHIP_ENGINES_LIST)[number];

export type ShipEngine = {
	symbol: ShipEngineSymbol;
	name: string;
	description: string;
	condition?: number;
	speed: number;
	requirements: ShipRequirements;
};

export type ShipModuleSymbol = (typeof SHIP_MODULES_LIST)[number];

export type ShipModule = {
	symbol: ShipModuleSymbol;
	capacity?: number;
	range?: number;
	name: string;
	description: string;
	requirements: ShipRequirements;
};

export type ShipMountSymbol = (typeof SHIP_MOUNTS_LIST)[number];
export type ShipDeposits = (typeof SHIP_DEPOSITS_LIST)[number];

export type ShipMount = {
	symbol: ShipMountSymbol;
	name: string;
	description?: string;
	strength?: number;
	deposits: ShipDeposits;
	requirements: ShipRequirements;
};

export type Ship = {
	symbol: string;
	nav: ShipNav;
	crew: ShipCrew;
	fuel: ShipFuel;
	frame: ShipFrame;
	reactor: ShipReactor;
	engine: ShipEngine;
	modules: ShipModule[];
	mounts: ShipMount[];
	registration: ShipRegistration;
	cargo: ShipCargo;
};
