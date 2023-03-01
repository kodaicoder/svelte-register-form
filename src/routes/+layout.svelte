<script>
	import '../app.css';
	// import 'sweetalert2/dist/sweetalert2.min.css';
	import { Toaster } from 'svelte-french-toast';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<Toaster />
<Header />
<main>
	<PageTransition duration={150}>
		<slot />
	</PageTransition>
</main>
