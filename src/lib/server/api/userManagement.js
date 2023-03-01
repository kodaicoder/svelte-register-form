import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import errorHelper from '$lib/server/errorHelper';

export const login = async (formData, locals) => {
	const { email, password } = formData;
	console.log(locals);
	try {
		const key = await auth.validateKeyPassword('email', email, password);
		const session = await auth.createSession(key.userId);
		locals.setSession(session);
	} catch (error) {
		const eMessage = errorHelper(error);
		console.log('Register error : ', eMessage);
		return fail(400, { message: eMessage });
	}
	throw redirect(302, '/todo');
};

export const logout = async (locals) => {
	const session = await locals.validate();
	if (!session) {
		throw redirect(302, '/');
	}
	await auth.invalidateSession(session.sessionId);
	locals.setSession(null);
	throw redirect(302, '/');
};

export const register = async (formData) => {
	const { name, email, password } = formData;
	try {
		await auth.createUser({
			key: {
				providerId: 'email',
				providerUserId: email,
				password
			},
			attributes: {
				name,
				email,
				username: email
			}
		});
	} catch (error) {
		const eMessage = errorHelper(error);
		console.log('Register error : ', eMessage);
		return fail(400, { message: eMessage });
	}
	throw redirect(302, '/login');
};
