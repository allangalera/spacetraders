import { writable } from 'svelte/store';

export type User = {
	username: string;
};

export const userStore = writable<User | null>(null);

export const setUser = (user: User) => {
	userStore.set(user);
};
