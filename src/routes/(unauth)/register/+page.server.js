import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { name, email, password, passwordConfirm, terms } = formData;
		console.log('SERVER SIDE HIT !!!');
		console.log(formData);

		try {
			await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					name,
					username: email
				}
			});
		} catch (error) {
			console.log(error);
			return fail(400, { message: 'Could not registered user.' });
		}
		throw redirect(302, '/login');
	}
};
