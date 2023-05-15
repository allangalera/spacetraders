import { saves } from '$lib/db/schema';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';

export const DELETE = async ({ locals, params }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		return new Response(null, { status: 401 });
	}

	try {
		await db.delete(saves).where(and(eq(saves.userId, user.userId), eq(saves.id, params.id)));
	} catch (error) {
		console.error(error);
		return new Response(null, { status: 400 });
	}

	return new Response(null);
};
