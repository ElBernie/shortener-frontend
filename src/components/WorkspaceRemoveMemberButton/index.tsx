'use client';
import { removeWorkspaceMemberAction } from '@/actions/workspaces/removeWorkspaceMember.action';
import { hasUserPermission } from '@/helpers';
import { useSession } from 'next-auth/react';

interface WorkspaceRemoveMemberButtonProps {
	memberId: string;
	onMemberRemoved?: (memberId?: string) => void;
}
const WorkspaceRemoveMemberButton = ({
	memberId,
	onMemberRemoved,
}: WorkspaceRemoveMemberButtonProps) => {
	const session = useSession();

	if (!session.data?.currentWorkspace || !session.data?.user) return null;

	const removeMember = async () => {
		await removeWorkspaceMemberAction(
			session?.data.currentWorkspace.id,
			memberId
		);
		onMemberRemoved?.(memberId);
	};

	const userHasRights = hasUserPermission({
		session: session.data,
		permission: 'workspaceMembersRemove',
	});

	if (!userHasRights) return null;

	return <button onClick={async () => await removeMember()}>Remove</button>;
};

export default WorkspaceRemoveMemberButton;
