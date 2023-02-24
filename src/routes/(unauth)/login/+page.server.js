import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log('SERVER SIDE HIT !!!');
		console.log(formData);

		const { email, password } = formData;
		try {
			const key = await auth.validateKeyPassword('email', email, password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (error) {
			console.log(error);
			return fail(400, { message: 'Could not login a user' });
		}
		throw redirect(302, '/todo');
	}
};
