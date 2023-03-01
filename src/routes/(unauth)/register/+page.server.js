// import { auth } from '$lib/server/lucia';
// import { fail, redirect } from '@sveltejs/kit';
// import errorHelper from '$lib/server/errorHelper';
import { redirect } from '@sveltejs/kit';
import { register } from '$lib/server/api/userManagement';

/** @type {import('./$types').PageServerLoad} */
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
		return await register(formData);
	}
};
