'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AccountLinksPage = () => {
	const session = useSession();

	return (
		<div>
			<h1>Account Links</h1>
			{JSON.stringify(session)}
			<Link href='/account/settings'>Account settings</Link>
		</div>
	);
};
export default AccountLinksPage;
