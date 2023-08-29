import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const DELETE = async (
	request: Request,
	{ params }: { params: { workspaceId: string; userId: string } }
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new NextResponse(null, { status: 401 });

	if (!params.workspaceId || !params.userId)
		throw new NextResponse(null, {
			status: 400,
			statusText: 'Bad request',
		});

	const removeMemberRequest = await fetch(
		`${process.env.API_URL}/workspaces/${params.workspaceId}/members/${params.userId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			cache: 'no-store',
		}
	);

	if (!removeMemberRequest.ok)
		throw new NextResponse(null, {
			status: removeMemberRequest.status,
			statusText: removeMemberRequest.statusText,
		});

	return new NextResponse(null, {
		status: removeMemberRequest.status,
		statusText: removeMemberRequest.statusText,
	});
};
