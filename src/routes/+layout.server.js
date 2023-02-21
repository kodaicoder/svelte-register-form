/** @type {import('./$types').LayoutServerLoad} */

export async function load({ cookies }) {
	const currentTheme = cookies.get('theme');
	return { theme: currentTheme };
}
