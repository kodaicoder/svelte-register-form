<script>
	import { enhance } from '$app/forms';
	import { yupValidator } from '$lib/yup/validator.js';
	import { loginSchema } from '$lib/yup/schema.js';
	import FloatInput from '$lib/components/FloatInput.svelte';
	import FloatInputPassword from '$lib/components/FloatInputPassword.svelte';
	import toast from 'svelte-french-toast';

	let fieldErrors = {};
	let isSubmitted = false;

	const onFormInput = async (event) => {
		////! On form input event client side validation
		const formData = await new FormData(event.target.form);
		//? yup validate on form input event.
		fieldErrors = await yupValidator(formData, loginSchema);
	};

	const onFormSubmit = async ({ form, cancel }) => {
		////! Before form submitting event client side validation
		isSubmitted = true;
		const formData = await new FormData(form);

		//? yup validate before form submit event
		fieldErrors = await yupValidator(formData, loginSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			isSubmitted = false;
			switch (result.type) {
				case 'failure':
					toast.error('Login failed , email or password is incorrect.', {
						style: 'border-radius: 1rem; background: hsl(var(--er)); color: hsl(var(--erc));',
						position: 'top-right'
					});
					update({ reset: false });
					break;
				case 'error':
					console.error('Login :', 'ERROR!');
					update({ reset: false });
					break;
				default:
			}
			update();
		};
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="card card-bordered flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
		<div class="card-body">
			<h2 class="card-title justify-center">Hello there !</h2>
			<h2 class="card-title  justify-center">Login</h2>
			<div class="form-control  m-2">
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
					<div class="flex justify-center p-2">
						<button type="submit" class="btn btn-primary w-1/2">Login</button>
					</div>
				</form>
				<div class="flex justify-center p-2">
					<a href="/register" class="btn btn-secondary w-1/2">Register</a>
				</div>
			</div>
		</div>
	</div>
</div>
