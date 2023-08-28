'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const WorkspacesPage = () => {
	const { data: session, update: updateSession } = useSession();
	const [workspaces, setWorkspaces] = useState<any[]>([]);
	const getWorkspaces = async () => {
		const request = await fetch('/api/workspaces', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		});
		const data = await request.json();
		const owned = data.filter(
			(workspace: any) => workspace.ownerId == session?.user.id
		);
		const member = data
			.filter((workspace: any) => workspace.ownerId != session?.user.id)
			.map((workspace: any) => {
				const permissions = workspace.WorkspaceMembers[0].role;

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

		setWorkspaces([...owned, ...member]);
	};

	useEffect(() => {
		getWorkspaces();
	}, []);
	return (
		<div>
			WorkspaceSelector <br />
			Current workspace: {JSON.stringify(session?.currentWorkspace)}
			<br />
			<hr />
			{workspaces.length > 0 &&
				workspaces.map((workspace) => (
					<div key={workspace.id}>
						{workspace.name}
						{session?.currentWorkspace.id != workspace.id && (
							<button
								onClick={() => updateSession({ currentWorkspace: workspace })}
							>
								select
							</button>
						)}
					</div>
				))}
		</div>
	);
};
export default WorkspacesPage;
