'use client';

import { getLinksAction } from '@/actions/links/getLinks.action';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const WorkspaceLinksPage = () => {
	const session = useSession();
	const [links, setLinks] = useState([]);

	const getLinks = async (workspaceId: string) => {
		const links = await getLinksAction(workspaceId, {
			include: ['URL'],
			userId: '123',
		});
		setLinks(links);
	};

	useEffect(() => {
		if (session.status == 'authenticated') {
			getLinks(session.data?.currentWorkspace.id);
		}
	}, [session]);

	return (
		<>
			Links
			<br />{' '}
			<ul>
				{links.map((link: any) => (
					<li key={link.alias}>{JSON.stringify(link)}</li>
				))}
			</ul>
		</>
	);
};

export default WorkspaceLinksPage;
