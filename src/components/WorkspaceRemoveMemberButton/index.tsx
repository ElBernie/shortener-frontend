'use client';
import { hasUserPermission } from '@/helpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const WorkspaceRemoveMemberButton = ({ memberId }: { memberId: string }) => {
	const session = useSession();
	const { refresh } = useRouter();
	if (!session.data?.currentWorkspace || !session.data?.user) return null;

	const removeMember = async () => {
		const removeMemberRequest = await fetch(
			`/api/workspaces/${session?.data.currentWorkspace.id}/members/${memberId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${session?.data.user?.accessToken}`,
				},
			}
		);
		if (!removeMemberRequest.ok) throw new Error('Something went wrong');

		refresh();
	};

	const userHasRights = hasUserPermission({
		session: session.data,
		permission: 'workspaceMembersRemove',
	});

	if (!userHasRights) return null;

	return <button onClick={async () => await removeMember()}>Remove</button>;
};

export default WorkspaceRemoveMemberButton;
