import { WORKSPACE_PERMISSIONS, Workspace } from '@/types/types';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface HasUserPermissionProps {
	session?: Session | null;
	permission: keyof typeof WORKSPACE_PERMISSIONS;
}
export const hasUserPermission = ({
	session,
	permission,
}: HasUserPermissionProps) => {
	if (!session) return false;
	const workspace = session.currentWorkspace;
	const user = session.user;
	if (workspace.ownerId == user.id) return true;
	if (workspace.permissions?.[permission]) return true;

	return false;
};

export const getUsersWorkspaces = async () => {
	const session = await getSession();
	if (!session?.user.id) redirect('/auth/signin');

	const request = await fetch('/api/workspaces', {
		cache: 'no-store',
		next: {
			revalidate: 10,
		},
	});

	const data: Workspace[] = await request.json();

	const owned: Workspace[] = data.filter(
		(workspace: any) => workspace.ownerId == session.user.id
	);

	const member: Workspace[] = data
		.filter((workspace: Workspace) => {
			if (
				workspace.ownerId != session.user.id &&
				workspace.WorkspaceMembers &&
				workspace.WorkspaceMembers.length > 0
			) {
				return true;
			} else {
				return false;
			}
		})
		.map((workspace: Workspace) => {
			const permissions = workspace.WorkspaceMembers?.[0].role;

			delete workspace.WorkspaceMembers;
			delete permissions.id;
			delete permissions.deletable;
			delete permissions.default;
			delete permissions.createdAt;
			delete permissions.updatedAt;
			delete permissions.workspaceId;
			return {
				...workspace,
				permissions,
			};
		});
	return { owned, member };
};
