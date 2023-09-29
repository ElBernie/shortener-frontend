'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const deleteWorkspaceAction = async (workspaceId: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');
	if (!session.currentWorkspace.deletable)
		throw new Error('WORKSPACE_IS_NOT_DELETABLE');
	if (workspaceId != session.currentWorkspace.id)
		throw new Error('INSUFFICIENT_PERMISSIONS');
	if (session.currentWorkspace.ownerId != session.user.id)
		throw new Error('INSUFFICIENT_PERMISSIONS');

	const deleteWorkspaceRequest = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			cache: 'no-store',
		}
	);

	if (!deleteWorkspaceRequest.ok) throw new Error();

	const data = await deleteWorkspaceRequest.json();
	return data;
};
