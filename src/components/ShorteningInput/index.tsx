'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValue, useForm } from 'react-hook-form';
import { hasUserPermission } from '@/helpers';

const ShorteningInput = () => {
	const session = useSession();

	const { handleSubmit, register } = useForm();
	const [shortenedLinkAlias, setShortenedLinkAlias] = useState<string | null>(
		null
	);

	const shorten = async (data: FieldValue<{ url: string }>) => {
		const shortenRequest = await fetch(`/api/links`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!shortenRequest.ok) {
			/**
			 * @todo Handle error
			 */
			throw new Error('Failed to shorten link');
		}

		const shortenData = await shortenRequest.json();
		setShortenedLinkAlias(shortenData.alias);
	};

	if (
		localStorage.getItem('next-auth.session-token') &&
		session.status == 'loading'
	)
		return null;

	if (!hasUserPermission({ session: session.data, permission: 'linksCreate' }))
		return null;

	return (
		<>
			<form onSubmit={handleSubmit((data) => shorten(data))}>
				<input
					type='url'
					placeholder='Shorten your link'
					{...register('url', { required: true })}
				/>
				<button type='submit'>Shorten</button>
			</form>
			{shortenedLinkAlias && (
				<Link href={`/${shortenedLinkAlias}`}>{shortenedLinkAlias}</Link>
			)}
		</>
	);
};

export default ShorteningInput;
