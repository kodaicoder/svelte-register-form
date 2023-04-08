import { auth } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';
import errorHelper from '$lib/server/errorHelper';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	let eMessage;
	let response;
	const data = await request.json();
	const { name, email, password } = data;
	try {
		response = await auth.createUser({
			key: {
				providerId: 'email',
				providerUserId: email,
				password
			},
			attributes: {
				name,
				email,
				username: email
			}
		});
	} catch (err) {
		eMessage = errorHelper(err);
		throw error(400, eMessage);
	}
	return new Response(JSON.stringify({ message: 'done adding user.', response }), {
		status: 200
	});
};
