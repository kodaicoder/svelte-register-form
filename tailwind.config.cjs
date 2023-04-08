/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	// daisyUI config (optional)
	daisyui: {
		themes: ['emerald', 'dark'],
		darkTheme: 'dark'
	}
};
