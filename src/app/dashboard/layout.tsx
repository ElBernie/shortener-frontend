'use client';

import DashboardNav from '@/components/DashboardNav';
import { getUsersWorkspaces } from '@/helpers';
import { useSession } from 'next-auth/react';
import {
	useSelectedLayoutSegment,
	redirect,
	usePathname,
} from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname();
	const session = useSession();
	const segment = useSelectedLayoutSegment();
	const [loadingWorkspaces, setLoadinWorkspaces] = useState(true);

	const loadUserWorkspaces = async () => {
		if (session.data?.user.id) {
			const workspaces = await getUsersWorkspaces();

			// check if current workspace is still in the list of workspaces the user is a member of
			const mergedWorkspaces = [...workspaces.owned, ...workspaces.member];
			const workspacesIds = mergedWorkspaces.map((workspace) => workspace.id);

			if (!workspacesIds.includes(session.data.currentWorkspace.id)) {
				console.log('BIM BAM BOUM, CA SWITCHE');
				await session.update({
					currentWorkspace: workspaces.owned[0],
					workspaces,
				});
			}

			setLoadinWorkspaces(false);
		}
	};

	useEffect(() => {
		if (session.status != 'loading') {
			if (session.status != 'authenticated' || !session.data?.user) {
				redirect('/auth/signin?redirect=' + path);
			}

			loadUserWorkspaces();
		}
	}, [session]);

	if (session.status == 'loading' || loadingWorkspaces) {
		return <>loading account...</>;
	} else if (
		session.status == 'unauthenticated' ||
		(session.status == 'authenticated' && !session.data?.user)
	) {
		redirect('/auth/signin?redirect=' + path);
	} else {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexGrow: 1,
					gap: '1rem',
				}}
			>
				<DashboardNav />
				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					{children}
				</div>
			</div>
		);
	}
};
export default DashboardLayout;
