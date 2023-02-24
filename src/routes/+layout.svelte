<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<Header />
<main>
	<PageTransition duration={200}>
		<slot />
	</PageTransition>
</main>
