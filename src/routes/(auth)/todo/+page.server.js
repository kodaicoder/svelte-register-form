import { loadTodo } from '$lib/server/api/articlesManagement';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		todos: await loadTodo()
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	createTodo: async ({ request, locals }) => {
		const { user, session } = await locals.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/login');
		}

		const { title, detail } = Object.fromEntries(await request.formData());

		try {
			await prisma.todo.create({
				data: {
					title,
					detail,
					userId: user.userId
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the article.' });
		}

		return {
			status: 201
		};
	},
	deleteTodo: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			await prisma.todo.delete({
				where: {
					id: Number(id)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, {
				message: 'Something went wrong deleting your todo'
			});
		}

		return {
			status: 200
		};
	}
};
