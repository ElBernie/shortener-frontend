'use client';
import { getUsersWorkspaces } from '@/helpers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const WorkspacesPage = () => {
	const { data: session, update: updateSession } = useSession();
	const [workspaces, setWorkspaces] = useState<any[]>([]);
	const getWorkspaces = async () => {
		if (session?.user.id) {
			const { owned, member } = await getUsersWorkspaces();
			setWorkspaces([...owned, ...member]);
		}
	};

	useEffect(() => {
		getWorkspaces();
	}, []);
	return (
		<div>
			WorkspaceSelector <br />
			Current workspace: {JSON.stringify(session?.currentWorkspace)}
			<br />
			<Link href='/dashboard'>Dashboard</Link>
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
