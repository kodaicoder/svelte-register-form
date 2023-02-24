import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const { user } = await locals.validateUser();
	if (!user) {
		throw redirect(302, '/');
	}
	return {};
}
