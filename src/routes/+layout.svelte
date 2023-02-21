<script>
	import { themeStore } from '$lib/stores/store';
	import '../app.css';
	/** @type {import('./$types').LayoutData} */
	export let data;
	themeStore.set(data.theme ?? '');
</script>

<main>
	<slot />
</main>
