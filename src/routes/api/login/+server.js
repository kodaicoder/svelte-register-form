import errorHelper from '$lib/server/errorHelper';
import { auth } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	console.log('ENDPOINT HIT!!');
	let eMessage;
	let session;
	const data = await request.json();
	const { email, password } = data;
	try {
		const key = await auth.validateKeyPassword('email', email, password);
		session = await auth.createSession(key.userId);
	} catch (err) {
		console.log(err);
		eMessage = errorHelper(err);
		throw error(400, eMessage);
	}
	return new Response(JSON.stringify({ message: 'login done', session }), {
		status: 200
	});
};
