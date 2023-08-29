import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { hasUserPermission } from '@/helpers';

export const DELETE = async (
	req: Request,
	{ params }: { params: { workspaceId: string } }
) => {
	const session = await getServerSession(authOptions);

	if (!session?.user.accessToken) throw new NextResponse(null, { status: 401 });
	if (params.workspaceId != session.currentWorkspace.id)
		throw new NextResponse(null, { status: 403 });
	if (session.currentWorkspace.ownerId != session.user.id)
		throw new NextResponse(null, {
			status: 403,
		});

	const deleteWorkspaceRequest = await fetch(
		`${process.env.API_URL}/workspaces/${params.workspaceId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			cache: 'no-store',
		}
	);

	if (!deleteWorkspaceRequest.ok)
		throw new NextResponse(null, {
			status: deleteWorkspaceRequest.status,
			statusText: deleteWorkspaceRequest.statusText,
		});

	return new NextResponse(null, {
		status: deleteWorkspaceRequest.status,
		statusText: deleteWorkspaceRequest.statusText,
	});
};
