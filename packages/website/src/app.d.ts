// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/lucia').Auth;
		// eslint-disable-next-line @typescript-eslint/ban-types
		type UserAttributes = {};
	}
}

export {};
