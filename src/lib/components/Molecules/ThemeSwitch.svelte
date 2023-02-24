<script>
	import { page } from '$app/stores';
	import Toggle from './Atoms/Toggle.svelte';

	export let lightTheme = 'light';
	export let darkTheme = 'dark';
	let currentTheme = $page.data.theme;
	$: isDarkTheme = currentTheme === darkTheme;

	const setTheme = (ev) => {
		ev.detail.nodeEvent.currentTarget.checked
			? (currentTheme = darkTheme)
			: (currentTheme = lightTheme);
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 365);
		document.cookie = `theme=${currentTheme}; expires=${expirationDate.toUTCString()}; path=/`;
		document.documentElement.setAttribute('data-theme', currentTheme);
	};
</script>

<div class="form-control">
	<div class="label cursor-pointer">
		<Toggle bind:checked={isDarkTheme} on:change={setTheme} />
	</div>
</div>
