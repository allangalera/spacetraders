CREATE TABLE `auth_key` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`primary_key` boolean NOT NULL,
	`hashed_password` varchar(255),
	`expires` bigint
);

CREATE TABLE `game_saves` (
	`id` varchar(21) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`symbol` varchar(14) NOT NULL,
	`access_token` text NOT NULL
);

CREATE TABLE `auth_session` (
	`id` varchar(128) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL
);

CREATE TABLE `auth_user` (
	`id` varchar(15) PRIMARY KEY NOT NULL,
	`username` varchar(255)
);
