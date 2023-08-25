'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AccountSettings = () => {
	const session = useSession();

	return (
		<div>
			<h1>Account Settings</h1>
			{JSON.stringify(session)}
			<Link href='/account/links'>Account Links</Link>
		</div>
	);
};

export default AccountSettings;
