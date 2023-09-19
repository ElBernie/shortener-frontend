'use client';

import { useSession } from 'next-auth/react';

import { useRef, useState } from 'react';
import { FieldValue } from 'react-hook-form';
import { hasUserPermission } from '@/helpers';
import { Link } from '@/types/types';
import LinkDisplay from '../LinkDisplay';

const ShorteningInput = () => {
	const session = useSession();
	const urlInput = useRef<HTMLInputElement>(null);

	const [shortenedLinks, setShortenedLinks] = useState<Array<Link>>([]);

	const shorten = async (data: FieldValue<{ url: string }>) => {
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
		urlInput && urlInput.current && (urlInput.current.value = '');
		setShortenedLinks((currentLinks) => [...currentLinks, shortenData]);
	};

	if (session.status === 'loading') return <p>Loading shortening form</p>;
	if (
		session.status === 'authenticated' &&
		!hasUserPermission({ session: session.data, permission: 'linksCreate' })
	)
		return null;
	return (
		<>
			<form>
				<input
					ref={urlInput}
					type='url'
					placeholder='Paste your link here'
					autoComplete='off'
					autoCapitalize='off'
					autoCorrect='off'
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
