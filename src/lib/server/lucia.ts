import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma.js';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	sessionTimeout: {
		//3 hrs
		activePeriod: 1000 * 60 * 60 * 3,
		//6 hrs
		idlePeriod: 1000 * 60 * 60 * 6
	},
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			name: userData.name,
			email: userData.email
		};
	}
});

export type Auth = typeof auth;
