'use client';

import { getUsersWorkspaces } from '@/helpers';
import { useSession } from 'next-auth/react';

import {
	useSelectedLayoutSegment,
	redirect,
	usePathname,
} from 'next/navigation';

import { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname();
	const session = useSession();
	const segment = useSelectedLayoutSegment();
	if (!session?.data?.user && session?.status != 'loading') {
		redirect('/auth/signin?redirect=' + path);
	}

	const loadUserWorkspaces = async () => {
		if (session.data?.user.id) {
			const workspaces = await getUsersWorkspaces();

			// check if current workspace is still in the list of workspaces the user is a member of
			const mergedWorkspaces = [...workspaces.owned, ...workspaces.member];
			const workspacesIds = mergedWorkspaces.map((workspace) => workspace.id);

			if (!workspacesIds.includes(session.data.currentWorkspace.id)) {
				session.update({
					currentWorkspace: workspaces.owned[0],
					workspaces,
				});
			}

			// compare current workspace to the one in the session, if they are different, update the session (manage permissions)
			const currentWorkspace = mergedWorkspaces.filter(
				(workspace) => workspace.id == session.data.currentWorkspace.id
			)[0];
			if (
				JSON.stringify(currentWorkspace) !=
				JSON.stringify(session.data.currentWorkspace)
			) {
				session.update({ currentWorkspace: currentWorkspace });
			}
		}
	};

	useEffect(() => {
		if (session.status == 'authenticated') {
			loadUserWorkspaces();
		}
	}, [segment, session]);

	if (session && session.status == 'loading') {
		return <>loading account...</>;
	} else {
		return <>{children}</>;
	}
};
export default DashboardLayout;
