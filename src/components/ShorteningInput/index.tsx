'use client';

import { useSession } from 'next-auth/react';

import { useRef, useState } from 'react';
import { FieldValue } from 'react-hook-form';
import { hasUserPermission } from '@/helpers';
import { Link } from '@/types/types';
import LinkDisplay from '../LinkDisplay';
import { Oval } from 'react-loader-spinner';
import style from './style.module.scss';
const ShorteningInput = () => {
	const session = useSession();
	const urlInput = useRef<HTMLInputElement>(null);

	const [shortenedLinks, setShortenedLinks] = useState<Array<Link>>([]);
	const [isShortening, setShortening] = useState<boolean>(false);

	const shorten = async (data: FieldValue<{ url: string }>) => {
		setShortening(true);
		const shortenRequest = await fetch(`/api/links`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		if (!shortenRequest.ok) {
			/**
			 * @todo Handle error
			 */
			throw new Error('Failed to shorten link');
		}

		const shortenData = await shortenRequest.json();
		urlInput?.current && (urlInput.current.value = '');
		setShortenedLinks((currentLinks) => [...currentLinks, shortenData]);
		setShortening(false);
	};

	const cursor = () => {
		if (session.status === 'loading') {
			return { cursor: 'wait' };
		} else if (
			session.status === 'authenticated' &&
			!hasUserPermission({
				session: session.data,
				permission: 'linksCreate',
			})
		) {
			return { cursor: 'not-allowed' };
		} else {
			return { cursor: 'auto' };
		}
	};
	return (
		<>
			<form className={style.shorteningForm}>
				<input
					ref={urlInput}
					type='url'
					placeholder='Paste your link here'
					autoComplete='off'
					autoCapitalize='off'
					autoCorrect='off'
					disabled={
						isShortening ||
						session.status === 'loading' ||
						(session.status === 'authenticated' &&
							!hasUserPermission({
								session: session.data,
								permission: 'linksCreate',
							}))
					}
					style={cursor()}
					onPaste={(event) => {
						try {
							const url = new URL(event.clipboardData.getData('text'));
							shorten({ url: url.toString() });
						} catch (error) {
							/**
							 * @todo Handle error
							 */
						}
					}}
				/>
				{isShortening && (
					<Oval
						wrapperClass={style.loader}
						height={25}
						width={25}
						color='rgb(76, 138, 116)'
						visible={true}
						ariaLabel='loading'
						secondaryColor='rgb(240, 138, 0)'
						strokeWidth={5}
						strokeWidthSecondary={5}
					/>
				)}
			</form>
			{shortenedLinks.length > 0 && (
				<div>
					{shortenedLinks.reverse().map((link) => (
						<LinkDisplay
							link={link}
							key={link.id}
							hideToolbar
							onDelete={(linkId: string) =>
								setShortenedLinks((currentLinks) =>
									currentLinks.filter((link) => link.id !== linkId)
								)
							}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default ShorteningInput;
