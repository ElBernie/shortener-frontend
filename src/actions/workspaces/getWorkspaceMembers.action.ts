'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/types/types';
import { getServerSession } from 'next-auth';

export const getWorkspaceMembersAction = async (
	workspaceId: string
): Promise<{ owner: User; members: Array<User> }> => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const membersRequest = await fetch(
		`${process.env.API_URL}/workspaces/${session?.currentWorkspace.id}/members`,
		{
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	if (!membersRequest.ok) {
		const errorCode = await membersRequest.text();
		throw new Error(errorCode || 'UNKNOWN_ERROR');
	}

	const data = await membersRequest.json();
	return data;
};
