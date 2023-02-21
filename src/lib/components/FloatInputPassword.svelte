<script>
	import Icon from '@iconify/svelte';
	export let name;
	export let labelText;
	export let value = '';
	export let errorMessage = '';
	export let isSubmitted = false;
	export let isCanShowPass = false;

	let isTouched = false;
	let eyeIcon = 'ph:eye-duotone';

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

	const changeType = async (event) => {
		const inputElement = event.target.closest('div').querySelector('input');
		if (inputElement.type === 'password') {
			inputElement.type = 'text';
			eyeIcon = 'ph:eye-slash-duotone';
		} else {
			inputElement.type = 'password';
			eyeIcon = 'ph:eye-duotone';
		}
	};
</script>

<div class="input-group my-5">
	<div class="form-floating">
		<input
			{name}
			placeholder=" "
			use:resetAction
			type="password"
			class="input input-bordered w-full {!!errorMessage &&
				(isTouched || isSubmitted) &&
				'input-error'}"
			on:input={() => (isTouched = true)}
			bind:value
		/>
		<label for={name} class="label"> {labelText} </label>
		{#if !!errorMessage && (isTouched || isSubmitted)}
			<div class="flex items-center absolute py-1 px-2 whitespace-nowrap text-error">
				<Icon class="mx-2" icon="ph:warning-fill" />
				<span class="p-0 bg-transparent">{errorMessage}</span>
			</div>
		{/if}
	</div>
	<span class="px-2 cursor-pointer" on:click={changeType}>
		<Icon icon={eyeIcon} width="20" height="20" />
	</span>
</div>
