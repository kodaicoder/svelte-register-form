<script>
	import { page } from '$app/stores';
	import Toggle from './Atoms/Toggle.svelte';

	export let lightTheme = 'light';
	export let darkTheme = 'dark';
	let currentTheme = $page.data.theme;
	let isDarkTheme = currentTheme === darkTheme;

	const setTheme = () => {
		isDarkTheme ? (currentTheme = darkTheme) : (currentTheme = lightTheme);
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 365);
		document.cookie = `theme=${currentTheme}; expires=${expirationDate.toUTCString()}; path=/`;
		document.documentElement.setAttribute('data-theme', currentTheme);
	};
</script>

<div class="form-control">
	<Toggle bind:checked={isDarkTheme} on:change={setTheme} />
</div>
