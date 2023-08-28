import { WORKSPACE_PERMISSIONS } from '@/types/types';
import { Session } from 'next-auth';

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
