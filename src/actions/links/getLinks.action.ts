'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { queryBuilder } from '@/helpers/queryBuilder.helper';
import { getServerSession } from 'next-auth';

interface GetLinksActionOptions {
	userId?: string;
	include?: Array<'workspace' | 'user' | 'URL' | 'domain'>;
}
export const getLinksAction = async (
	workspaceId: string,
	options?: GetLinksActionOptions
) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const queryString = queryBuilder({
		userId: options?.userId,
		include: options?.include,
	});

	const request = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}/links${queryString}`,
		{
			headers: {
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
			next: {
				tags: ['getLinks'],
			},
		}
	);

	if (!request.ok) throw new Error();
	const data = await request.json();

	return data;
};
