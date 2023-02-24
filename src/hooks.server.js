import { sequence } from '@sveltejs/kit/hooks';
import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/server/lucia';
// import { redirect } from '@sveltejs/kit';

export async function pageHandle({ event, resolve }) {
	let currentTheme = event.cookies.get('theme');
	if (!currentTheme) {
		event.cookies.set('theme', 'emerald', {
			path: '/',
			httpOnly: false,
			maxAge: 60 * 60 * 24 * 365
		});
		currentTheme = 'emerald';
	}
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${currentTheme}"`)
	});
	// if (event.url.pathname === '/') {
	// 	return redirect(301, '/login');
	// }
	return response;
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(handleHooks(auth), pageHandle);
