/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log('SERVER SIDE HIT !!!');
		console.log(formData);
	}
};
