import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Invite } from '@/types/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken)
		return new NextResponse(null, { status: 401 });

	const getInvitesRequest = await fetch(
		`${process.env.API_URL}/users/${session.user.id}/invites`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	if (!getInvitesRequest.ok)
		return new NextResponse(null, {
			status: getInvitesRequest.status,
			statusText: getInvitesRequest.statusText,
		});

	const data: Invite[] = await getInvitesRequest.json();
	return new NextResponse(JSON.stringify(data.length > 0 ? data : []), {
		status: getInvitesRequest.status,
		statusText: getInvitesRequest.statusText,
	});
};
