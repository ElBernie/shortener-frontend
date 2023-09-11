'use client';
import { Link as LinkType } from '@/types/types';
import Link from 'next/link';

const LinkDisplay = ({ link }: { link: LinkType }) => {
	return (
		<div>
			<a
				href={`${window.location.protocol}//${window.location.host}/${link.alias}`}
			>
				{window.location.host}/{link.alias}
			</a>
			{link.stats?.visits && (
				<span>
					{''} {link.stats.visits}
				</span>
			)}
		</div>
	);
};

export default LinkDisplay;
