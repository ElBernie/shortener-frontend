import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const data = await req.json();

	const shortenRequest = await fetch(`${process.env.API_URL}/links`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
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
