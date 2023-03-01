import { logout } from '$lib/server/api/userManagement';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals }) => {
	await logout(locals);
};
