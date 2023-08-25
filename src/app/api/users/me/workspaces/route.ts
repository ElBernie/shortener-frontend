import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken)
		return new NextResponse(null, { status: 401 });

	const request = await fetch(`${process.env.API_URL}/users/me/workspaces`, {
		headers: req.headers,
	});

	if (!request.ok) {
		throw new NextResponse(null, {
			status: request.status,
			statusText: request.statusText,
		});
	}

	return new NextResponse(request.body, {
		status: request.status,
	});
};
