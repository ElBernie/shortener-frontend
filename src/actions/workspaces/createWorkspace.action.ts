'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const createWorkspaceAction = async (name: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const createRequest = await fetch(`${process.env.API_URL}/workspaces`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session.user.accessToken}`,
		},
		body: JSON.stringify({ name: name }),
	});

	/** @todo better error handling */
	if (!createRequest.ok) throw new Error();

	const data = await createRequest.json();
	return data;
};
