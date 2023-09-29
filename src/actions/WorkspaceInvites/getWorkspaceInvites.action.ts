'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Invite } from '@/types/types';
import { getServerSession } from 'next-auth';

export const getWorkspaceInvitesAction = async (): Promise<Invite[]> => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const getInvitesRequest = await fetch(
		`${process.env.API_URL}/users/${session.user.id}/invites`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	/** @todo better error handling */
	if (!getInvitesRequest.ok) throw new Error();

	const data: Invite[] = await getInvitesRequest.json();
	return data.length > 0 ? data : [];
};
