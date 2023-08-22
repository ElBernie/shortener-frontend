import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const requestBody = await req.json();
	const registerRequest = await fetch(`${process.env.API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});

	if (!registerRequest.ok) {
		return new NextResponse(null, {
			status: registerRequest.status,
			statusText: registerRequest.statusText,
		});
	}

	return new NextResponse(registerRequest.body, {
		status: registerRequest.status,
		statusText: registerRequest.statusText,
	});
}
