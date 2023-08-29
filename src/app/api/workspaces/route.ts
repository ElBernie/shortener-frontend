import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async (req: Request) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken)
		return new NextResponse(null, { status: 401 });

	const getWorkspacesRequest = await fetch(
		`${process.env.API_URL}/workspaces`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			cache: 'no-store',
		}
	);

	const data = await getWorkspacesRequest.json();
	console.log(data);

	if (!getWorkspacesRequest.ok)
		throw new NextResponse(null, {
			status: getWorkspacesRequest.status,
			statusText: getWorkspacesRequest.statusText,
		});

	return new NextResponse(JSON.stringify(data), {
		status: getWorkspacesRequest.status,
		statusText: getWorkspacesRequest.statusText,
	});
};
