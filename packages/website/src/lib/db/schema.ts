import { mysqlTable, bigint, varchar, boolean, text } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	username: varchar('username', {
		length: 255
	})
	// other user attributes
});

export const session = mysqlTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = mysqlTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});

export const saves = mysqlTable('game_saves', {
	id: varchar('id', {
		length: 21
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	symbol: varchar('symbol', {
		length: 14
	}).notNull(),
	access_token: text('access_token').notNull()
});
