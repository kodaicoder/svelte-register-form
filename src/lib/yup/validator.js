export const yupValidator = async (formData, schema) => {
	try {
		const formObj = Object.fromEntries(await formData.entries());
		await schema.validate(formObj, { abortEarly: false });
	} catch (errors) {
		const fieldErrors = errors.inner.reduce(
			(res, value) => ({
				[value.path]: value.message,
				...res
			}),
			{}
		);
		return fieldErrors;
	}
};
