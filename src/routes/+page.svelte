<script>
	import { enhance } from '$app/forms';
	import { yupValidator } from '$lib/yup/validator.js';
	import { registerSchema } from '$lib/yup/schema.js';
	import FloatInput from '$lib/components/FloatInput.svelte';
	import FloatInputPassword from '$lib/components/FloatInputPassword.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';

	let fieldErrors = {};
	let isSubmitted = false;

	const onFormInput = async (event) => {
		////! On form input event client side validation
		//? parse `FormData` element to `FormData` object
		const formData = await new FormData(event.target.form);
		const formObj = Object.fromEntries(await formData.entries());

		//? yup validate on form input event.
		fieldErrors = await yupValidator(formObj, registerSchema);
	};

	const onFormSubmit = async ({ form, data, cancel }) => {
		////! Before form submitting event client side validation
		isSubmitted = true;

		//? parse `FormData` element to `FormData` object
		const formObj = Object.fromEntries(data);

		//? yup validate before form submit event
		fieldErrors = await yupValidator(formObj, registerSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			isSubmitted = false;
			update();
		};
	};
</script>

<div class="flex justify-end">
	<ThemeSwitch lightTheme="emerald" darkTheme="night" />
</div>

<div class="flex flex-col items-center justify-center h-full">
	<div class="card card-bordered flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body">
			<h2 class="card-title m-2 justify-center">Login</h2>
			<div class="form-control w-full max-w-xs m-2">
				<form method="POST" use:enhance={onFormSubmit} on:input={onFormInput}>
					<FloatInput
						name="email"
						type="email"
						labelText="Email"
						errorMessage={!!fieldErrors ? fieldErrors.email : ''}
						{isSubmitted}
					/>
					<FloatInputPassword
						name="password"
						labelText="Password"
						errorMessage={!!fieldErrors ? fieldErrors.password : ''}
						{isSubmitted}
					/>
					<div class="flex justify-center p-4">
						<button type="submit" class="btn btn-primary w-1/2">Login</button>
					</div>
				</form>
				<div class="flex justify-center p-4">
					<button class="btn btn-secondary w-1/2">Register</button>
				</div>
			</div>
		</div>
	</div>
</div>
