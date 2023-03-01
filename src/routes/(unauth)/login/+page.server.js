import { redirect } from '@sveltejs/kit';
import { login } from '$lib/server/api/userManagement';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		return await login(formData, locals);
	}
};
