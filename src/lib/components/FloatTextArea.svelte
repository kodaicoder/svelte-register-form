<script>
	import Icon from '@iconify/svelte';
	export let name;
	export let labelText;
	export let rows = 3;
	export let value = '';
	export let errorMessage = '';
	export let isSubmitted = false;

	let isTouched = false;

	//made input listen on form reset event
	const resetAction = (node) => {
		const resetTouched = () => (isTouched = false);
		node.form?.addEventListener('reset', resetTouched);
		return {
			destroy() {
				node.form?.removeEventListener('reset', resetTouched);
			}
		};
	};
</script>

<div class="form-floating">
	<textarea
		{name}
		placeholder=" "
		{rows}
		use:resetAction
		class="textarea textarea-bordered w-full {!!errorMessage &&
			(isTouched || isSubmitted) &&
			'textarea-error'}"
		on:input={() => (isTouched = true)}
		bind:value
	/>
	<label for={name} class="label"> {labelText} </label>

	{#if !!errorMessage && (isTouched || isSubmitted)}
		<div class="flex items-center absolute whitespace-nowrap text-error">
			<Icon class="mx-2" icon="ph:warning-fill" />
			<span>{errorMessage}</span>
		</div>
	{/if}
</div>
