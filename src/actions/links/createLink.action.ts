'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { hasUserPermission } from '@/helpers';
import { getServerSession } from 'next-auth';

export const createLinkAction = async (url: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	if (session && !hasUserPermission({ session, permission: 'linksCreate' }))
		throw new Error('INSUFFICIENT_PERMISSIONS');

	const shortenRequest = await fetch(`${process.env.API_URL}/links`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(session?.user?.accessToken && {
				Authorization: `Bearer ${session.user.accessToken}`,
			}),
		},
		body: JSON.stringify({
			url: url,
			workspaceId: session?.currentWorkspace.id,
		}),
	});

	/** @todo better error handling */
	if (!shortenRequest.ok) throw new Error();

	const data = await shortenRequest.json();
	return data;
};
