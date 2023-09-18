'use client';

import WorkspaceLinksLangs from '@/components/charts/WorkspaceLinksLangs';
import WorkspaceLinksVisits from '@/components/charts/WorkspaceLinksVisits';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const WorkspacePage = () => {
	const session = useSession();
	if (!session.data?.currentWorkspace) return redirect('/dashboard/workspaces');

	const workspace = session.data.currentWorkspace;
	return (
		<div>
			{workspace.name}
			<WorkspaceLinksVisits workspaceId={session.data.currentWorkspace.id} />
			<WorkspaceLinksLangs workspaceId={session.data.currentWorkspace.id} />
		</div>
	);
};
export default WorkspacePage;
