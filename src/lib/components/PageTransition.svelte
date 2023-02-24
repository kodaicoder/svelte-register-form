<script>
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	export let duration = 300;
</script>

{#key $navigating}
	{#if !$navigating}
		<!-- {#key key} -->
		<div
			class="flex justify-center absolute w-full mt-3"
			in:fade={{ duration, delay: duration }}
			out:fade={{ duration }}
		>
			<slot />
		</div>
	{/if}
{/key}
