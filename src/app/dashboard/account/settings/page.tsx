'use client';
import { deleteUserAction } from '@/actions/users/deleteUser.action';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const AccountSettings = () => {
	const session = useSession();

	const deleteAccount = async () => {
		if (session.data?.user.id) {
			await deleteUserAction(session.data?.user.id);
			signOut();
		}
	};

	return (
		<div>
			<h1>Account Settings</h1>
			{JSON.stringify(session)}
			<Link href='/dashboard/account'>Account</Link>
			<button onClick={() => deleteAccount()}>Delete account</button>
		</div>
	);
};

export default AccountSettings;
