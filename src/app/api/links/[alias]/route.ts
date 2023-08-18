import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	context: { params: { alias: string } }
) {
	const linkData = await fetch(
		`${process.env.API_URL}/links/${context.params.alias}`
	);
	const response = await linkData.json();

	return NextResponse.json(response, {
		status: linkData.status,
	});
}
