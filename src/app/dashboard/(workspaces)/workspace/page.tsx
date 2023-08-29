'use client';

import { hasUserPermission } from '@/helpers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const WorkspacePage = () => {
	const session = useSession();
	if (!session.data?.currentWorkspace) return redirect('/dashboard/workspaces');

	const workspace = session.data.currentWorkspace;
	return (
		<div>
			{workspace.name}
			{workspace.type !== 'PERSONAL' && (
				<Link href={`/dashboard/workspace/members`}>members</Link>
			)}
			{hasUserPermission({
				session: session.data,
				permission: 'workspaceEdit',
			}) && <Link href={'/dashboard/workspace/settings'}>settings</Link>}
		</div>
	);
};
export default WorkspacePage;
