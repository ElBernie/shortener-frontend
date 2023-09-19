'use client';
import { Link as LinkType } from '@/types/types';

import { LuBarChart3, LuCalendar, LuLock, LuTrash2 } from 'react-icons/lu';
import style from './style.module.scss';
import { useState } from 'react';
import { deleteLink } from '@/actions/links/deleteLink.action';
import { link } from 'fs';

export interface LinkDisplayProps {
	link: LinkType;
	hideToolbar?: boolean;
	onDelete(linkId: string): void;
}
const LinkDisplay = (props: LinkDisplayProps) => {
	const baseURL = props.link.URL ? new URL(props.link.URL.url).origin : null;
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
				<h4>{props.link.title ?? props.link.URL?.title ?? 'Unnamed link'}</h4>

				<a
					href={`${window.location.protocol}//${window.location.host}/${props.link.alias}`}
					target='_blank'
				>
					{window.location.host}/{props.link.alias}
				</a>
				{props.link.id}
				<div className={style.linkCardFooter}>
					{props.hideToolbar ? null : (
						<>
							<span>
								<LuBarChart3 /> {props.link.hits ?? '0'} visites
							</span>
							<span>
								<LuCalendar />{' '}
								{new Date(props.link.createdAt).toLocaleDateString()}
							</span>
							<span>
								<LuTrash2
									onClick={async () => {
										await deleteLink(props.link.id);
										props.onDelete(props.link.id);
									}}
								/>
							</span>
							{props.link.password && (
								<span>
									<LuLock />
								</span>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default LinkDisplay;
