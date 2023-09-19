'use client';
import { Link as LinkType } from '@/types/types';

import { LuBarChart3, LuCalendar, LuLock, LuTrash2 } from 'react-icons/lu';
import style from './style.module.scss';
import { useState } from 'react';
import { deleteLink } from '@/actions/links/deleteLink.action';
const LinkDisplay = ({
	link,
	onDelete,
}: {
	link: LinkType;
	onDelete(linkId: string): void;
}) => {
	const baseURL = link.URL ? new URL(link.URL.url).origin : null;
	const [showIcon, setShowIcon] = useState(true);
	return (
		<div className={style.linkCardContainer}>
			<div className={style.iconContainer}>
				<div className={style.icon}>
					{showIcon && (
						<img
							src={`https://www.google.com/s2/favicons?domain=${baseURL}&sz=32`}
							height={32}
							width={32}
							onError={() => setShowIcon(false)}
						/>
					)}
				</div>
			</div>

			<div className={style.linkCardBody}>
				<h4>{link.title ?? link.URL?.title ?? 'Unnamed link'}</h4>

				<a
					href={`${window.location.protocol}//${window.location.host}/${link.alias}`}
					target='_blank'
				>
					{window.location.host}/{link.alias}
				</a>
				{link.id}
				<div className={style.linkCardFooter}>
					<span>
						<LuBarChart3 /> {link.hits ?? '0'} visites
					</span>
					<span>
						<LuCalendar /> {new Date(link.createdAt).toLocaleDateString()}
					</span>
					<span>
						<LuTrash2
							onClick={async () => {
								await deleteLink(link.id);
								onDelete(link.id);
							}}
						/>
					</span>
					{link.password && (
						<span>
							<LuLock />
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default LinkDisplay;
