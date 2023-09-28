'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { hasUserPermission } from '@/helpers';
import { getServerSession } from 'next-auth';

export const createWorkspaceInviteAction = async (
	workspaceId: string,
	userEmail: string
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');
	if (session.currentWorkspace.type == 'PERSONAL')
		throw new Error('INVALID_WORKSPACE_TYPE');

	if (
		workspaceId != session.currentWorkspace.id ||
		!hasUserPermission({ session, permission: 'workspaceMembersInvite' })
	)
		throw new Error('INSUFFICIENT_PERMISSIONS');

	const sendInviteRequest = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}/invites`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({
				workspaceId: workspaceId,
				email: userEmail,
			}),
		}
	);

	if (!sendInviteRequest.ok) throw new Error();
	const data = await sendInviteRequest.json();
	return data;
};
