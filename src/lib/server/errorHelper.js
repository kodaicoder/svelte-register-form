import { Prisma } from '@prisma/client';
import { LuciaError } from 'lucia-auth';

const errorHelper = (error) => {
	let eMessage = 'Unknown error occurs';
	//user already in use
	if (error instanceof LuciaError) {
		//? Duplicate key on user and key creation (AUTH_DUPLICATE_KEY_ID)
		//? Invalid user id (AUTH_INVALID_USER_ID)
		//? Invalid keys (AUTH_INVALID_KEY_ID)
		//? Duplicate session id on session creation and renewal (AUTH_DUPLICATE_SESSION_ID)
		switch (error.message) {
			case 'AUTH_DUPLICATE_KEY_ID':
				eMessage = 'Duplicate email in our system, please try to change your email.';
				break;
			case 'AUTH_INVALID_USER_ID':
				eMessage = 'Invalid user id';
				break;
			case 'AUTH_INVALID_KEY_ID':
				eMessage = 'Invalid keys';
				break;
			case 'AUTH_DUPLICATE_SESSION_ID':
				eMessage = 'Duplicate session id on session creation and renewal';
				break;
		}
	}
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2002') {
			eMessage =
				'There is a unique constraint violation, a new user cannot be created with this email';
		}
	}
	return eMessage;
};

export default errorHelper;
