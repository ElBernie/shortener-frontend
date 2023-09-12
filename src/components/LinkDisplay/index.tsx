'use client';
import { Link as LinkType } from '@/types/types';

import {
	LuSearch,
	LuBarChart3,
	LuCalendar,
	LuUserCircle2,
	LuLock,
} from 'react-icons/lu';
import style from './style.module.scss';
import { useState } from 'react';
const LinkDisplay = ({ link }: { link: LinkType }) => {
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
				>
					{window.location.host}/{link.alias}
				</a>
				<div className={style.linkCardFooter}>
					<span>
						<LuBarChart3 /> {link.hits ?? '0'} visites
					</span>
					<span>
						<LuCalendar /> {new Date(link.createdAt).toLocaleDateString()}
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
