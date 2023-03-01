<script>
	import { scale, fade } from 'svelte/transition';

	export let isShow = false; // boolean
	export let allowOutsideClick = true;
	export let containerTransition = fade;
	export let contentTransition = scale;
	export let transitionDuration = 250;
	export let isHasTopCloseButton = true;

	const closeModal = () => {
		isShow = false;
	};
	const outsideClick = () => {
		if (allowOutsideClick) {
			closeModal();
		}
	};
</script>

{#if isShow}
	<div
		class="flex fixed justify-center items-center z-50 left-0 top-0 w-full h-full overflow-auto bg-black/60"
		transition:containerTransition={{ duration: transitionDuration }}
		on:click|self={outsideClick}
	>
		<!-- Modal content -->
		<div
			class="relative modal-content rounded-xl w-full md:w-2/3 lg:w-1/2 h-full md:h-auto p-5 bg-base-100 border shadow-lg shadow-[hsl(var(--bc))]/10"
			transition:contentTransition={{ duration: transitionDuration }}
		>
			{#if isHasTopCloseButton}
				<button on:click={closeModal} class="btn btn-xs btn-circle absolute right-2 top-2">✕</button
				>
			{/if}

			<slot name="header" />
			<slot name="body" />
			<slot name="footer" />
		</div>
	</div>
{/if}
