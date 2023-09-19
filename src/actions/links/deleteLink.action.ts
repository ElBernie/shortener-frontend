'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const deleteLink = async (linkId: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const request = await fetch(`${process.env.API_URL}/links/${linkId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	});

	/**
	 * @todo error handling
	 */
	if (!request.ok) throw new Error();

	return true;
};
