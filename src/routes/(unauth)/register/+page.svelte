<script>
	import { enhance } from '$app/forms';
	import { yupValidator } from '$lib/yup/validator.js';
	import { registerSchema } from '$lib/yup/schema.js';
	import FloatInput from '$lib/components/FloatInput.svelte';
	import FloatInputPassword from '$lib/components/FloatInputPassword.svelte';
	import CheckboxWithLabel from '$lib/components/CheckboxWithLabel.svelte';

	let fieldErrors = {};
	let isSubmitted = false;

	const onFormInput = async (event) => {
		////! On form input event client side validation
		const formData = await new FormData(event.target.form);
		//? yup validate on form input event.
		fieldErrors = await yupValidator(formData, registerSchema);
	};

	const onFormSubmit = async ({ form, cancel }) => {
		////! Before form submitting event client side validation
		isSubmitted = true;
		const formData = await new FormData(form);

		//? yup validate before form submit event
		fieldErrors = await yupValidator(formData, registerSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			isSubmitted = false;
			update();
		};
	};

	const termsModalOpen = async () => {
		console.log('terms is open.');
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="card card-bordered flex-shrink-0 w-full max-w-md md:max-w-xl shadow-2xl bg-base-100">
		<div class="card-body">
			<h2 class="card-title m-2 justify-center">Register</h2>
			<div class="form-control m-2">
				<form method="POST" use:enhance={onFormSubmit} on:input={onFormInput}>
					<div class="md:flex md:gap-5">
						<FloatInput
							name="name"
							type="text"
							labelText="Full Name"
							errorMessage={!!fieldErrors ? fieldErrors.name : ''}
							{isSubmitted}
						/>
						<FloatInput
							name="email"
							type="email"
							labelText="Email"
							errorMessage={!!fieldErrors ? fieldErrors.email : ''}
							{isSubmitted}
						/>
					</div>
					<div class="md:flex md:gap-5">
						<FloatInputPassword
							name="password"
							labelText="Password"
							errorMessage={!!fieldErrors ? fieldErrors.password : ''}
							{isSubmitted}
						/>
						<FloatInputPassword
							name="passwordConfirm"
							labelText="Confirm Password"
							errorMessage={!!fieldErrors ? fieldErrors.passwordConfirm : ''}
							{isSubmitted}
						/>
					</div>

					<CheckboxWithLabel
						name="terms"
						labelText="Please accept "
						errorMessage={!!fieldErrors ? fieldErrors.terms : ''}
						{isSubmitted}
					>
						<a href="#" on:click={termsModalOpen} class="font-bold underline"
							><i>terms and conditions.</i></a
						>
					</CheckboxWithLabel>

					<div class="flex justify-center mt-3 p-2">
						<button type="submit" class="btn btn-primary w-1/2">Submit</button>
					</div>
				</form>
				<div class="flex justify-center p-2">
					<a href="/login" class="btn w-1/2">Back</a>
				</div>
			</div>
		</div>
	</div>
</div>
