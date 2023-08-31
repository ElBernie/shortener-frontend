import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import WorkspaceRemoveMemberButton from '@/components/WorkspaceRemoveMemberButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const WorkspaceMembersPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.currentWorkspace) redirect('/dashboard/workspaces');
	if (session.currentWorkspace.type === 'PERSONAL') redirect('/dashboard');
	const membersRequest = await fetch(
		`${process.env.API_URL}/workspaces/${session?.currentWorkspace.id}/members`,
		{
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		}
	);

	/**
	 * @todo better error handling
	 */
	if (!membersRequest.ok) throw new Error('Something went wrong');

	const members = await membersRequest.json();
	return (
		<div>
			<h1>Workspace Members Page</h1>
			owner: {members.owner.email}
			{members.length == 0 ? (
				<p>No members</p>
			) : (
				<ul>
					{members.members.map((member: any) => (
						<li key={member.id}>
							{member.email}{' '}
							<WorkspaceRemoveMemberButton memberId={member.id} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default WorkspaceMembersPage;
