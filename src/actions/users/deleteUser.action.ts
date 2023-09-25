'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const deleteUserAction = async (userId: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const deleteUserRequest = await fetch(
		`${process.env.API_URL}/users/${userId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	/** @todo better handling */
	if (!deleteUserRequest.ok) throw new Error();
	return true;
};
