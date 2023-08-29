'use client';

import { getUsersWorkspaces, hasUserPermission } from '@/helpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const WorkspaceSettingsPage = () => {
	const session = useSession();
	const router = useRouter();
	if (!session.data?.currentWorkspace)
		return router.replace('/dashboard/workspaces');
	if (
		!hasUserPermission({
			session: session.data,
			permission: 'workspaceEdit',
		})
	)
		return router.replace('/dashboard/');

	const deleteWorkspace = async () => {
		const deleteRequest = await fetch(
			`/api/workspaces/${session.data.currentWorkspace.id}`,
			{
				method: 'DELETE',
			}
		);

		/**
		 * @todo error handling
		 */

		const defaultWorkspace = await (
			await getUsersWorkspaces()
		).owned.filter((workspace) => workspace.type === 'PERSONAL')[0];
		session.update({
			currentWorkspace: defaultWorkspace,
		});

		router.push('/dashboard/workspaces');
	};

	return (
		<>
			<h1>Settings</h1>
			{session.data.currentWorkspace.ownerId == session.data.user.id &&
				session.data.currentWorkspace.deletable && (
					<button onClick={async () => await deleteWorkspace()}>
						Delete workspace
					</button>
				)}
		</>
	);
};
export default WorkspaceSettingsPage;
