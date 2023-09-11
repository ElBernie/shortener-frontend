'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { queryBuilder } from '@/helpers/queryBuilder.helper';
import { getServerSession } from 'next-auth';

interface GetLinksStatsActionOptions {
	userId?: string;
	include?: Array<'workspace' | 'user' | 'URL' | 'domain'>;
}
export const getLinkStatsAction = async (
	linkId: string,
	options?: GetLinksStatsActionOptions
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const request = await fetch(`${process.env.API_URL}/links/${linkId}/stats`, {
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
		next: {
			tags: ['getLinksData'],
		},
	});

	if (!request.ok) throw new Error();
	const data = await request.json();

	return data;
};
