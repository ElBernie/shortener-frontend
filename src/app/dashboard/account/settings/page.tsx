'use client';
import { deleteUserAction } from '@/actions/users/deleteUser.action';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserWorkspaces } from '@/actions/users/getUserWorkspaces.action';
import { Workspace } from '@/types/types';

const AccountSettings = () => {
	const session = useSession();

	const [workspaces, setWorkspaces] = useState<
		| {
				owned: Workspace[];
				member: Workspace[];
		  }
		| undefined
	>(undefined);
	const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);

	const loadWorkspaces = async () => {
		setLoadingWorkspaces(true);
		const workspaces = await getUserWorkspaces();
		setWorkspaces(workspaces);
	};
	useEffect(() => {
		if (session.status == 'authenticated' && session.data?.user.id) {
			loadWorkspaces();
		}
	}, [session]);
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
			<div>
				<button
					onClick={() => deleteAccount()}
					disabled={
						!loadingWorkspaces || (workspaces && workspaces.owned.length > 1)
					}
				>
					Delete account
				</button>

				{workspaces && workspaces.owned.length > 1 && (
					<p>
						You must delete all your workspaces before you can delete your
						account
					</p>
				)}
			</div>
		</div>
	);
};

export default AccountSettings;
