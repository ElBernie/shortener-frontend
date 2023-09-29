'use server';

import { Link } from '@/types/types';

export const getLinkByAliasAction = async (alias: string): Promise<Link> => {
	const linkRequest = await fetch(
		`${process.env.API_URL}/links/alias/${alias}`,
		{
			cache: 'no-cache',
		}
	);

	if (!linkRequest.ok) throw new Error();
	if (linkRequest.status == 404) throw Error('NOT_FOUND');
	/**@todo better error handling */
	const data = await linkRequest.json();
	return data;
};
