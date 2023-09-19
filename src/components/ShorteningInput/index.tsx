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

	if (session.status === 'loading') return <p>Loading shortening form</p>;
	if (
		session.status === 'authenticated' &&
		!hasUserPermission({ session: session.data, permission: 'linksCreate' })
	)
		return null;
	return (
		<>
			<form onSubmit={handleSubmit((data) => shorten(data))}>
				<input
					type='url'
					placeholder='Shorten your link'
					autoComplete='off'
					autoCapitalize='off'
					autoCorrect='off'
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
