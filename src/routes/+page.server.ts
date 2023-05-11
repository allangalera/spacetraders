import { saves } from '$lib/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		throw redirect(302, '/login');
	}

	const savedGames = await db.select().from(saves).where(eq(saves.userId, user.userId));

	return {
		username: user.username,
		savedGames: savedGames
	};
};
