import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	return await prisma.todo.findMany({
		where: { isDone: false }
	});
};
