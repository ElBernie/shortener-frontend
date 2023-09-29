'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const updateWorkspaceInviteAction = async (
	inviteId: string,
	{
		action,
	}: {
		action: 'ACCEPT' | 'REJECT';
	}
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const inviteActionRequest = await fetch(
		`${process.env.API_URL}/users/${session.user.id}/invites/${inviteId}`,
		{
			method: 'PATCH',
			body: JSON.stringify({ action: action }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	/** @todo better error handling */
	if (!inviteActionRequest.ok) throw new Error();
	const data = await inviteActionRequest.json();

	return data;
};
