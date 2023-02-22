import { redirect } from '@sveltejs/kit';
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
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
	if (event.url.pathname === '/') {
		return redirect(301, '/login');
		// return new Response(null, {
		// 	status: 301,
		// 	headers: { location: '/login' }
		// });
	}
	return response;
}
