import { saves } from '$lib/db/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		return new Response(null, { status: 401 });
	}

	const savedGames = await db.select().from(saves).where(eq(saves.userId, user.userId));

	return json({
		data: savedGames,
	});
};
