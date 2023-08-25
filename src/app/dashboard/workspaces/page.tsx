'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const WorkspacesPage = () => {
	const { data: session, update: updateSession } = useSession();
	const [workspaces, setWorkspaces] = useState<{
		owned: any[];
		member: any[];
	} | null>(null);
	const getWorkspaces = async () => {
		const request = await fetch('/api/users/me/workspaces', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		});
		const data = await request.json();
		setWorkspaces(data);
	};

	useEffect(() => {
		getWorkspaces();
	}, []);
	return (
		<div>
			WorkspaceSelector <br />
			Current workspace: {JSON.stringify(session?.workspace)}
			<br />
			<hr />
			{workspaces?.owned &&
				workspaces?.owned?.length > 0 &&
				workspaces.owned.map((workspace) => (
					<div key={workspace.id}>
						{workspace.name}
						{session?.workspace.id != workspace.id && (
							<button onClick={() => updateSession({ workspace: workspace })}>
								select
							</button>
						)}
					</div>
				))}
		</div>
	);
};
export default WorkspacesPage;
