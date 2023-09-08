import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: '/:alias*',
};

export function middleware(request: NextRequest) {
	const headers = new Headers(request.headers);

	let ip = request.ip ?? headers.get('x-real-ip');
	const forwardedFor = headers.get('x-forwarded-for');
	if (!ip && forwardedFor) {
		ip = forwardedFor.split(',').at(0) ?? null;
	}
	if (ip) headers.set('ip', ip);

	const response = NextResponse.next({
		headers: headers,
	});
	return response;
}
