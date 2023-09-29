'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const removeWorkspaceMemberAction = async (
	workspaceId: string,
	userId: string
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const removeMemberRequest = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}/members/${userId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			cache: 'no-store',
		}
	);

	/**@todo better error handling */
	if (!removeMemberRequest.ok) throw new Error();

	const data = await removeMemberRequest.json();
	return data;
};
