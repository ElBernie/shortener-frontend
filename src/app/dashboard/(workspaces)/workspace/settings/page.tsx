'use client';

import { deleteWorkspaceAction } from '@/actions/workspaces/deleteWorskpace.action';
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
		return router.replace('/dashboard/workspace');

	const deleteWorkspace = async () => {
		await deleteWorkspaceAction(session.data.currentWorkspace.id);

		/**
		 * @todo error handling
		 */

		const userWorkspaces = await getUsersWorkspaces();
		const defaultWorkspace = userWorkspaces.owned.filter(
			(workspace) => workspace.type === 'PERSONAL'
		)[0];
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
