export const yupValidator = async (formObj, schema) => {
	try {
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
