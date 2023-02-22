<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
</script>

<div class="flex justify-end">
	<ThemeSwitch lightTheme="emerald" darkTheme="dark" />
</div>

<PageTransition duration={200}>
	<slot />
</PageTransition>
