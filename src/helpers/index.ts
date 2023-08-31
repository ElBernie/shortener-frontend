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

	const request = await fetch('/api/users/me/workspaces', {
		cache: 'no-store',
		next: {
			revalidate: 10,
		},
	});

	const data: { owned: Workspace[]; member: Workspace[] } =
		await request.json();

	const member: Workspace[] = data.member
		.filter((workspace: Workspace) => {
			if (workspace.WorkspaceMembers && workspace.WorkspaceMembers.length > 0) {
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
	return { owned: data.owned, member };
};
