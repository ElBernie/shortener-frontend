'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Workspace } from '@/types/types';
import { getServerSession } from 'next-auth';

export const getUserWorkspaces = async (): Promise<{
	owned: Workspace[];
	member: Workspace[];
}> => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const getWorkspacesRequest = await fetch(
		`${process.env.API_URL}/users/${session.user.id}/workspaces`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			next: {
				tags: ['getUserWorkspaces'],
			},
		}
	);

	/** @todo better handling */
	if (!getWorkspacesRequest.ok) throw new Error();
	const data = await getWorkspacesRequest.json();
	return data;
};
