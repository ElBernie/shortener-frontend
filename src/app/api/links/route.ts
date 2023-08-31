import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { hasUserPermission } from '@/helpers';

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);

	if (session && !hasUserPermission({ session, permission: 'linksCreate' }))
		return new NextResponse(null, { status: 401 });

	const data = await req.json();

	const shortenRequest = await fetch(`${process.env.API_URL}/links`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(session?.user?.accessToken && {
				Authorization: `Bearer ${session.user.accessToken}`,
			}),
		},
		body: JSON.stringify({
			...data,
			workspaceId: session?.currentWorkspace.id,
		}),
	});

	if (!shortenRequest.ok) {
		throw new NextResponse(null, {
			status: shortenRequest.status,
			statusText: shortenRequest.statusText,
		});
	}

	return new NextResponse(shortenRequest.body, {
		status: shortenRequest.status,
	});
}
