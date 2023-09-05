const AccountValidationPage = async ({
	params,
}: {
	params: { validationToken: string };
}) => {
	const { validationToken } = params;

	const request = await fetch(
		`${process.env.API_URL}/auth/validate/${validationToken}`
	);

	/**
	 * @todo better error handling
	 */
	if (!request.ok) {
		return <div>Something went wrong</div>;
	} else {
		return <div>Account validated !</div>;
	}
};

export default AccountValidationPage;
