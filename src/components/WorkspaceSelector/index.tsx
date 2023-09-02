'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { Workspace } from '@/types/types';
import { set } from 'react-hook-form';
import Link from 'next/link';

interface WorkspaceSelectionPanelProps {
	workspaces: Workspace[];
}
const WorkspaceSelectionPanel = (props: WorkspaceSelectionPanelProps) => {
	const session = useSession();

	const onSelect = (workspace: Workspace) => {
		session.update({ currentWorkspace: workspace });
	};
	return (
		<ul className={style.selectionPanel}>
			{props.workspaces.map((workspace) => {
				return (
					<li key={workspace.id} onClick={() => onSelect(workspace)}>
						{workspace.name}
					</li>
				);
			})}
			<li>
				<Link href='/dashboard/workspaces/create'>Create a new workspace</Link>
			</li>
		</ul>
	);
};

interface WorkspaceSelectorProps {
	style?: React.CSSProperties;
}

const WorkspaceSelector = (props: WorkspaceSelectorProps) => {
	const session = useSession();
	const ref = useRef<HTMLDivElement>(null);
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
	const [showWorkspaceSelectionPanel, setShowWorkspaceSelectionPanel] =
		useState<boolean>(false);
	const getWorkspaces = async () => {
		const request = await fetch('/api/users/me/workspaces');
		const data: { owned: Workspace[]; member: Workspace[] } =
			await request.json();

		setWorkspaces([...data.owned, ...data.member]);
	};

	useEffect(() => {
		getWorkspaces();
	}, []);

	// handle click outside of the component
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShowWorkspaceSelectionPanel(false);
			}
		};
		document.addEventListener('click', handleClick, true);
		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={style.selectorContainer}
			style={props.style}
			onClick={() =>
				setShowWorkspaceSelectionPanel((currentState) => !currentState)
			}
			onBlur={() => setShowWorkspaceSelectionPanel(false)}
		>
			<div className={style.selectorButton}>
				{session.status === 'loading' ? (
					'Loading...'
				) : (
					<>{session.data?.currentWorkspace.name}</>
				)}
			</div>

			{showWorkspaceSelectionPanel && (
				<WorkspaceSelectionPanel workspaces={workspaces} />
			)}
		</div>
	);
};

export default WorkspaceSelector;
