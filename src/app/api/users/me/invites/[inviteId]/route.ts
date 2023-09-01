import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const POST = async (
	req: Request,
	{ params }: { params: { inviteId: string } }
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken)
		return new NextResponse(null, { status: 401 });

	const reqBody = await req.json();
	const inviteActionRequest = await fetch(
		`${process.env.API_URL}/users/${session.user.id}/invites/${params.inviteId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	if (!inviteActionRequest.ok) {
		return new NextResponse(null, {
			status: inviteActionRequest.status,
			statusText: inviteActionRequest.statusText,
		});
	}

	return new NextResponse(null, {
		status: inviteActionRequest.status,
		statusText: inviteActionRequest.statusText,
	});
};
