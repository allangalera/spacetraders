import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { Config } from 'sst/node/config';
import { connect } from '@planetscale/database';

export const connection = connect({
	host: Config.DATABASE_HOST,
	username: Config.DATABASE_USERNAME,
	password: Config.DATABASE_PASSWORD
});

export const db = drizzle(connection);
