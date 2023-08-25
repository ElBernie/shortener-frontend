import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	if (!req.headers.get('Authorization'))
		return new NextResponse(null, { status: 401 });

	const reqBody = await req.json();
	const createRequest = await fetch(`${process.env.API_URL}/workspaces`, {
		method: 'POST',
		headers: req.headers,
		body: JSON.stringify(reqBody),
	});

	if (!createRequest.ok)
		throw new NextResponse(null, {
			status: createRequest.status,
			statusText: createRequest.statusText,
		});

	return new NextResponse(createRequest.body, {
		status: createRequest.status,
		statusText: createRequest.statusText,
	});
};
