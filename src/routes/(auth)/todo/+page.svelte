<script>
	import { enhance } from '$app/forms';
	import FloatInput from '$lib/components/FloatInput.svelte';
	import FloatTextArea from '$lib/components/FloatTextArea.svelte';
	import { addToDoSchema } from '$lib/yup/schema';
	import { yupValidator } from '$lib/yup/validator';
	import toast, { Toaster } from 'svelte-french-toast';

	/** @type {import('./$types').PageData} */
	export let data;
	let fieldErrors = {};
	let isSubmitted = false;
	$: ({ todos } = data);

	const onFormInput = async (event) => {
		////! On form input event client side validation
		const formData = await new FormData(event.target.form);
		console.log(formData);
		//? yup validate on form input event.
		fieldErrors = await yupValidator(formData, addToDoSchema);
	};

	const onFormSubmit = async ({ form, cancel }) => {
		////! Before form submitting event client side validation
		isSubmitted = true;
		const formData = await new FormData(form);

		//? yup validate before form submit event
		fieldErrors = await yupValidator(formData, addToDoSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			isSubmitted = false;
			switch (result.type) {
				case 'failure':
					toast.error('Adding todo failed.', {
						style: 'border-radius: 1rem; background: hsl(var(--er)); color: hsl(var(--erc));',
						position: 'top-right'
					});
					update({ reset: false });
					break;
				case 'error':
					console.error('Adding todo :', 'ERROR!');
					update({ reset: false });
					break;
				default:
			}
			update();
		};
	};
</script>

<div>
	<h1>This is a Todo page that need authenticate to access</h1>

	<div class="flex mt-6 gap-10">
		<div class="flex-1">
			<h2>List of Todo:</h2>
			{#each todos as todo}
				<div class="card bg-base-100 shadow-lg bordered my-4">
					<div class="card-body">
						<h1 class="card-title">{todo.title}</h1>
						<p>{todo.detail}</p>
						<div class="card-actions flex justify-center mt-4 gap-5">
							<form action="?/deleteTodo&id={todo.id}" method="POST" use:enhance>
								<button type="submit" class="btn btn-sm btn-error">Delete Todo</button>
							</form>
							<a href="/{todo.id}" role="button" class="btn btn-sm btn-info">Edit Todo</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<form
			method="POST"
			action="?/createTodo"
			class="form-control"
			use:enhance={onFormSubmit}
			on:input={onFormInput}
		>
			<div class="flex flex-col gap-4">
				<h3>New Todo</h3>
				<FloatInput
					name="title"
					type="text"
					labelText="Title"
					{isSubmitted}
					errorMessage={!!fieldErrors ? fieldErrors.title : ''}
				/>
				<FloatTextArea
					name="detail"
					labelText="Detail"
					rows={5}
					{isSubmitted}
					errorMessage={!!fieldErrors ? fieldErrors.detail : ''}
				/>
				<button type="submit" class="btn btn-sm btn-primary m-4">Add Todo</button>
			</div>
		</form>
	</div>
</div>
