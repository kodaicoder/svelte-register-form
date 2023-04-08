// import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
// import errorHelper from '$lib/server/errorHelper';
import axios from 'axios';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, url }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			await axios.post(url.origin + '/api/register', JSON.stringify(formData), {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			//? if you want to get some data back from server us this block
			// const res = await axios.post(url.origin + '/api/register', JSON.stringify(formData), {
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	}
			// });
			// const data = await res.data;
			// console.log(data);
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				const { status, data } = error.response;
				return fail(status, data);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error >>', error.message);
				return fail(500, { message: 'Unexpected error occurred.' });
			}
		}
		throw redirect(302, '/login');
	}
};
