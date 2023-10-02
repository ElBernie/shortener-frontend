'use client';
import { getWorkspaceMembersAction } from '@/actions/workspaces/getWorkspaceMembers.action';
import { removeWorkspaceMemberAction } from '@/actions/workspaces/removeWorkspaceMember.action';
import WorkspaceRemoveMemberButton from '@/components/WorkspaceRemoveMemberButton';
import { getUsersWorkspaces } from '@/helpers';
import { User } from '@/types/types';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const WorkspaceMembersPage = () => {
	const {
		data: session,
		update: updateSession,
		status: sessionStatus,
	} = useSession();
	const [loadingMembers, setLoadingMembers] = useState(true);
	const [members, setMembers] = useState<
		| {
				owner: User;
				members: User[];
		  }
		| undefined
	>();

	const loadMembers = async () => {
		const members = await getWorkspaceMembersAction(
			session!.currentWorkspace.id
		);
		setMembers(members);
		setLoadingMembers(false);
	};

	useEffect(() => {
		if (sessionStatus != 'loading') {
			if (sessionStatus != 'authenticated' || !session.user)
				redirect('/auth/signin');
			if (!session?.currentWorkspace) redirect('/dashboard/workspaces');
			if (session.currentWorkspace.type === 'PERSONAL')
				redirect('/dashboard/workspace');
			loadMembers();
		}
	}, [session, sessionStatus]);

	if (loadingMembers) return <p>Loading...</p>;

	return (
		<div>
			{members && (
				<>
					<h1>Workspace Members Page</h1>
					owner: {members.owner.email}
					{members.owner.id !== session!.user.id && (
						<button
							onClick={async () => {
								await removeWorkspaceMemberAction(
									session!.currentWorkspace.id,
									session!.user.id
								);
								const userWorkspaces = await getUsersWorkspaces();
								const defaultWorkspace = userWorkspaces.owned.filter(
									(workspace) => workspace.type === 'PERSONAL'
								)[0];
								updateSession({
									currentWorkspace: defaultWorkspace,
								});
							}}
						>
							Leave workspace
						</button>
					)}
					{members.members.length == 0 ? (
						<p>No members</p>
					) : (
						<ul>
							{members.members.map((member: any) => (
								<li key={member.id}>
									{member.email}{' '}
									<WorkspaceRemoveMemberButton
										memberId={member.id}
										onMemberRemoved={(memberId) => {
											const updatedMembers = {
												owner: members.owner,
												members: members?.members.filter(
													(member) => member.id != memberId
												),
											};

											setMembers(updatedMembers);
										}}
									/>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	);
};
export default WorkspaceMembersPage;
