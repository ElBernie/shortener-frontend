'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getLinksAction = async (workspaceId: string) => {
	const session = await getServerSession(authOptions);
	if (!session?.user.accessToken) throw new Error('UNAUTHENTICATED');

	const request = await fetch(
		`${process.env.API_URL}/workspaces/${workspaceId}/links`,
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
