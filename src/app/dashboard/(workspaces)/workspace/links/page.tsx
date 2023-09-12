'use client';

import { getLinkStatsAction } from '@/actions/links/getLinkStats.action';
import { getLinksAction } from '@/actions/links/getLinks.action';
import LinkDisplay from '@/components/LinkDisplay';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import style from './style.module.scss';

const WorkspaceLinksPage = () => {
	const session = useSession();
	const [links, setLinks] = useState([]);

	const getLinks = async (workspaceId: string) => {
		const links = await getLinksAction(workspaceId, {
			include: ['URL'],
			userId: '123',
		});
		await Promise.all(
			links.map(async (link: any) => {
				const stats = await getLinkStatsAction(link.id);
				link.stats = stats;
			})
		);
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
			<div className={style.linksHolder}>
				{links.map((link: any) => (
					<LinkDisplay key={link.id} link={link} />
				))}
			</div>
		</>
	);
};

export default WorkspaceLinksPage;
