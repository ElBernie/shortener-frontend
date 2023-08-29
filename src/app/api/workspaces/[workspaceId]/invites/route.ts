import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { hasUserPermission } from '@/helpers';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const POST = async (
	req: Request,
	{ params }: { params: { workspaceId: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session?.user.accessToken || session.currentWorkspace.type == 'PERSONAL')
		return new NextResponse(null, { status: 401 });

	if (
		params.workspaceId != session.currentWorkspace.id ||
		!hasUserPermission({ session, permission: 'workspaceMembersInvite' })
	)
		return new NextResponse(null, { status: 403 });

	const reqBody = await req.json();
	const sendInviteRequest = await fetch(
		`${process.env.API_URL}/workspaces/${params.workspaceId}/invites`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ ...reqBody, workspaceId: params.workspaceId }),
		}
	);

	if (!sendInviteRequest.ok)
		return new NextResponse(null, {
			status: sendInviteRequest.status,
			statusText: sendInviteRequest.statusText,
		});

	return new NextResponse(null, {
		status: sendInviteRequest.status,
		statusText: sendInviteRequest.statusText,
	});
};
