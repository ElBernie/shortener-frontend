'use server';

export const registerAction = async (email: string, password: string) => {
	const registerRequest = await fetch(`${process.env.API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!registerRequest.ok) {
		switch (registerRequest.status) {
			case 409:
				throw new Error('EMAIL_ALREADY_IN_USE');
			default:
				throw new Error();
		}
	}

	return await registerRequest.json();
};
