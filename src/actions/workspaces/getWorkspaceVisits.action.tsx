'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { queryBuilder } from '@/helpers/queryBuilder.helper';
import { getServerSession } from 'next-auth';

export const getWorkspaceVisits = async (
	workspaceId: string,
	options?: {
		start?: string;
		end?: string;
		interval?: string;
	}
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const queryString = queryBuilder({
		start: options?.start,
		end: options?.end,
		interval: options?.interval,
	});

	const request = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}/stats/visits${queryString}`,
		{
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			next: {
				tags: ['getWorkspaceVisits'],
			},
		}
	);

	if (!request.ok) throw new Error();
	const data = await request.json();

	return data;
};
