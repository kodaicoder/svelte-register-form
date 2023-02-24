/** @type {import('./$types').LayoutServerLoad} */

export async function load({ cookies, locals }) {
	const currentTheme = cookies.get('theme');
	const { user } = await locals.validateUser();
	return { user, theme: currentTheme };
}
