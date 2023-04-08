import * as y from 'yup';

export const loginSchema = y.object({
	email: y
		.string()
		.trim()
		.email('Email must be valid format.')
		.required('Email is required.')
		.max(64, 'Email must be at most 64 characters.'),
	password: y
		.string()
		.trim()
		.required('Password is required.')
		.min(6, 'Password must be at least 6 characters.')
		.max(32, 'Password must be at most 32 characters')
});

export const registerSchema = y.object({
	name: y
		.string()
		.trim()
		.required('Name is required.')
		.max(64, 'Name must be at most 64 characters.'),
	email: y
		.string()
		.trim()
		.email('Email must be valid format.')
		.required('Email is required.')
		.max(64, 'Email must be at most 64 characters.'),
	password: y
		.string()
		.trim()
		.required('Password is required.')
		.min(6, 'Password must be at least 6 characters.')
		.max(32, 'Password must be at most 32 characters'),
	passwordConfirm: y
		.string()
		.trim()
		.required('Confirm password is required.')
		.min(6, 'Confirm password must be at least 6 characters.')
		.max(32, 'Confirm password must be at most 32 characters')
		.oneOf([''], 'Confirm password is required.')
		.oneOf([y.ref('password')], 'Passwords must match'),

	terms: y.boolean().oneOf([true], 'You must accept the terms and conditions.')
});

export const addToDoSchema = y.object({
	title: y
		.string()
		.trim()
		.required('Title is required.')
		.max(50, 'Title must be at most 50 characters.'),
	detail: y
		.string()
		.trim()
		.required('Detail is required.')
		.max(500, 'Detail must be at most 500 characters.')
});
