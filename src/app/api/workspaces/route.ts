import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
	if (!req.headers.get('Authorization'))
		return new NextResponse(null, { status: 401 });

	const getWorkspacesRequest = await fetch(
		`${process.env.API_URL}/workspaces`,
		{
			headers: req.headers,
		}
	);

	if (!getWorkspacesRequest.ok)
		throw new NextResponse(null, {
			status: getWorkspacesRequest.status,
			statusText: getWorkspacesRequest.statusText,
		});

	return new NextResponse(getWorkspacesRequest.body, {
		status: getWorkspacesRequest.status,
		statusText: getWorkspacesRequest.statusText,
	});
};
